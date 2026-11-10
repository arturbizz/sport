/*
  pin-client.js
  Клиентская часть для безопасной проверки PIN через Supabase Edge Function.

  ВАЖНО:
  1. Этот файл не обращается напрямую к access_pins или mm_pins.
  2. PIN не попадает в URL, localStorage, console.log или HTML.
  3. CORS обрабатывается Supabase SDK через functions.invoke().
  4. Перед подключением этого файла должны быть загружены:
     - supabase-js v2;
     - созданный supabaseClient;
     - функция showToast(message, isError), если она используется в проекте.
*/

(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const EDGE_FUNCTION_NAME = 'verify-pin';
  const PIN_MIN_LENGTH = 4;
  const PIN_MAX_LENGTH = 24;
  const REQUEST_TIMEOUT_MS = 10000;

  function getToastFunction() {
    if (typeof window.showToast === 'function') {
      return window.showToast;
    }

    return function (message, isError = false) {
      const toast = $('toast');
      if (!toast) return;
      toast.textContent = String(message ?? '');
      toast.className = `toast show ${isError ? 'error' : ''}`;
      window.setTimeout(() => toast.classList.remove('show'), 3500);
    };
  }

  function isValidPin(pin) {
    return typeof pin === 'string'
      && pin.length >= PIN_MIN_LENGTH
      && pin.length <= PIN_MAX_LENGTH
      && /^[A-Z0-9-]+$/.test(pin);
  }

  function isValidKind(kind) {
    return kind === 'kb' || kind === 'millionaire';
  }

  function getErrorMessage(error, data, responseStatus) {
    if (responseStatus === 429) {
      return 'Слишком много попыток. Повторите позже.';
    }

    if (responseStatus === 401 || data?.error === 'Invalid PIN.') {
      return 'Неверный PIN-код.';
    }

    if (responseStatus === 403) {
      return 'Запрос заблокирован политикой безопасности сайта.';
    }

    if (responseStatus >= 500) {
      return 'Сервис проверки PIN временно недоступен.';
    }

    if (error?.message?.toLowerCase().includes('cors')) {
      return 'Ошибка CORS. Проверьте ALLOWED_ORIGINS в настройках Edge Function.';
    }

    return 'Не удалось проверить PIN. Попробуйте ещё раз.';
  }

  function withTimeout(promise, timeoutMs) {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
      timeoutId = window.setTimeout(() => {
        reject(new Error('PIN verification timeout'));
      }, timeoutMs);
    });

    return Promise.race([promise, timeout])
      .finally(() => window.clearTimeout(timeoutId));
  }

  /**
   * Отправляет PIN на Edge Function.
   *
   * @param {object} supabaseClient - клиент window.supabase.createClient(...)
   * @param {'kb'|'millionaire'} kind - назначение PIN
   * @param {string} pin - PIN из поля формы
   * @returns {Promise<{ok: boolean, error?: string}>}
   */
  async function verifyPin(supabaseClient, kind, pin) {
    const toast = getToastFunction();

    if (!supabaseClient || typeof supabaseClient.functions?.invoke !== 'function') {
      toast('Supabase Client не инициализирован.', true);
      return { ok: false, error: 'client_not_initialized' };
    }

    if (!isValidKind(kind)) {
      toast('Неверно указан тип PIN-кода.', true);
      return { ok: false, error: 'invalid_kind' };
    }

    if (!isValidPin(pin)) {
      toast(`PIN должен содержать от ${PIN_MIN_LENGTH} до ${PIN_MAX_LENGTH} символов: латинские буквы, цифры или дефис.`, true);
      return { ok: false, error: 'invalid_pin_format' };
    }

    let result;
    try {
      // Supabase SDK сам добавляет Authorization, apikey и корректно выполняет
      // CORS preflight для Edge Function.
      result = await withTimeout(
        supabaseClient.functions.invoke(EDGE_FUNCTION_NAME, {
      body: {
          action: 'verify',
          kind,
            pin: pin.trim().toUpperCase()
          }
        }),
        REQUEST_TIMEOUT_MS
      );
    } catch (error) {
      // PIN намеренно не записываем в консоль и не включаем в текст ошибки.
      toast('Сервис проверки PIN недоступен.', true);
      return { ok: false, error: 'network_or_timeout' };
    }

    const data = result?.data || null;
    const error = result?.error || null;

    if (error || data?.ok !== true) {
      const responseStatus = error?.context?.status || error?.status || 0;
      const message = getErrorMessage(error, data, responseStatus);
      toast(message, true);
      return { ok: false, error: message };
    }

    return { ok: true };
  }

  /**
   * Подключает форму PIN без inline-JavaScript.
   *
   * Пример разметки:
   * <form id="kb-pin-form">
   *   <input id="kb-pin-input" type="password" inputmode="numeric"
   *          autocomplete="one-time-code" maxlength="12">
   *   <button id="kb-pin-submit" type="submit">Проверить</button>
   * </form>
   * <div id="kb-pin-error" role="status" aria-live="polite"></div>
   */
  function bindPinForm({
    supabaseClient,
    formId,
    inputId,
    submitId,
    messageId,
    kind,
    onSuccess
  }) {
    const form = $(formId);
    const input = $(inputId);
    const submitButton = $(submitId);
    const message = $(messageId);

    if (!form || !input || !submitButton) {
      return false;
    }

    input.setAttribute('autocomplete', 'one-time-code');
    input.setAttribute('maxlength', String(PIN_MAX_LENGTH));

    input.addEventListener('input', () => {
      input.value = input.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, PIN_MAX_LENGTH);
      if (message) message.textContent = '';
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const pin = input.value;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      if (message) message.textContent = '';

      const result = await verifyPin(supabaseClient, kind, pin);

      // Очищаем PIN независимо от результата. Он не должен оставаться
      // в поле дольше необходимого.
      input.value = '';
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');

      if (!result.ok) {
        if (message) {
          message.textContent = result.error || 'Проверка не пройдена.';
        }
        input.focus();
        return;
      }

      if (typeof onSuccess === 'function') {
        await onSuccess(result);
      }
    });

    return true;
  }

  // Доступно для страниц проекта без использования модулей ES.
  window.verifyProjectPin = verifyPin;
  window.bindProjectPinForm = bindPinForm;
})();
