const $ = (id) => document.getElementById(id);

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>',
  printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/><path d="M17 13h2"/></svg>',
  tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8M12 18v4M8 1l4 3 4-3"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 7.5 15.5 16.5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.8 2.1 18a2 2 0 0 0 1.7 3h16.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 4 7v5c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9V7z"/><path d="m9 12 2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14a8 8 0 0 1 16 0"/><path d="M4 14v4a2 2 0 0 0 2 2h1v-6H4zM20 14v4a2 2 0 0 1-2 2h-1v-6h3z"/><path d="M9 20h3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M21 3l-9 9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
};

const routes = [
  { id: 'new', label: 'Новое обращение', title: 'Новое обращение', description: 'Проведите клиента от приветствия до корректного оформления заявки.', icon: 'phone', tone: 'tone-green', tags: ['имя', 'город', 'ЛК'] },
  { id: 'printers', label: 'Принтеры и плоттеры', title: 'Принтеры и плоттеры', description: 'Лазерные, струйные устройства и плоттеры: ТО, выезд и обязательные вопросы.', icon: 'printer', tone: 'tone-blue', tags: ['ТО 7', 'ТО 12', 'ТО 522', 'ТО 761'] },
  { id: 'tv', label: 'Телевизоры', title: 'Телевизоры', description: 'Быстрые решения по пульту, настройке, матрице, модулям и сигналу.', icon: 'tv', tone: 'tone-dark', tags: ['ТО 934', 'матрица', 'стоп-факторы'] },
  { id: 'pck', label: 'ПЦК', title: 'Перезвон целевому клиенту', description: 'Подготовьте клиента к звонку профильного специалиста и передайте карту правильно.', icon: 'route', tone: 'tone-blue', tags: ['10 минут', 'контакт', 'актуальность'] },
  { id: 'objection', label: 'Не уговорил', title: 'Не уговорил', description: 'Отработка возражения и точный классификатор причины отказа.', icon: 'headset', tone: 'tone-orange', tags: ['скидка', 'преимущества', 'отказ'] },
  { id: 'guarantee', label: 'Заводская гарантия', title: 'Заводская гарантия', description: 'Отдельная ветка для гарантийной техники и сравнения с официальным сервисом.', icon: 'shield', tone: 'tone-green', tags: ['гарантия', 'сроки', 'выезд'] },
  { id: 'stop', label: 'Стоп-факторы', title: 'Стоп-факторы', description: 'Проверьте причину, которую нельзя пропустить, и не оформляйте неподходящий заказ.', icon: 'alert', tone: 'tone-red', tags: ['дальность', 'возраст', 'ЛК'] },
  { id: 'missed', label: 'Пропущенный звонок', title: 'Пропущенный и недозвон', description: 'Три попытки дозвона, корректный итог и выбор подтипа по результату.', icon: 'clock', tone: 'tone-orange', tags: ['3 попытки', 'спам', 'актуальность'] },
  { id: 'non-target', label: 'Нецелевые обращения', title: 'Нецелевые обращения', description: 'Спам, ошибка номера, вакансии, сотрудники и другие готовые исходы.', icon: 'route', tone: 'tone-dark', tags: ['спам', 'не ремонтируем', 'вакансии'] },
  { id: 'current', label: 'Текущий заказ', title: 'Текущий заказ', description: 'Не тратьте линию на текучку: перевод в сопровождение и правильная передача.', icon: 'phone', tone: 'tone-dark', tags: ['сопровождение', 'номер заказа'] }
];

const steps = {
  new: [
    { title: 'Начните с имени', question: 'Имя должно прозвучать в начале целевого разговора.', script: 'Как могу к вам обращаться?', checks: ['Не откладывайте вопрос об имени до конца разговора.', 'После имени обращайтесь к клиенту по имени.'], options: [{ label: 'Имя получено', next: 'city' }] },
    { id: 'city', title: 'Уточните город', question: 'Город нужен до условий, цен и обещаний по выезду.', script: 'Подскажите, пожалуйста, из какого вы города звоните?', checks: ['Для Москвы уточните МКАД.', 'Для Санкт-Петербурга уточните КАД.', 'Если города нет в карте, проверьте телефон линии.'], options: [{ label: 'Город рабочий', next: 'equipment' }, { label: 'Город вне зоны', result: { type: 'stop', title: 'Не оформляем из-за дальности', subtype: 'Стоп фактор', classifier: 'Дальность', action: 'Закрыть обращение с корректной причиной.' } }] },
    { id: 'equipment', title: 'Определите технику', question: 'Теперь выберите направление, чтобы открыть точный маршрут.', script: 'Подскажите, пожалуйста, с какой техникой и какой проблемой вы обращаетесь?', checks: ['Не называйте условия до определения оборудования.', 'Сразу после ответа откройте профильную ветку.'], options: [{ label: 'Принтер или плоттер', nextRoute: 'printers' }, { label: 'Телевизор', nextRoute: 'tv' }, { label: 'Другая техника', next: 'lk-check' }] },
    { id: 'lk-check', title: 'Проверьте ЛК', question: 'Перед оформлением откройте стоп-факторы и актуальные условия по выбранной услуге.', script: 'Спасибо, сейчас проверю возможность оформления по вашему оборудованию и условия выезда.', checks: ['Цена только из ЛК.', 'Проверьте, что услуга разрешена в городе клиента.', 'Не фиксируйте цену, если в ЛК указано «от».'], options: [{ label: 'Можно оформлять', result: { type: 'success', title: 'Переходите к оформлению', subtype: 'Новое обращение', classifier: 'По результату диалога', action: 'Заполнить карту и оформить заказ по ЛК.' }, }, { label: 'Нашли стоп-фактор', nextRoute: 'stop' }] }
  ],
  printers: [
    { title: 'Выберите тип устройства', question: 'От типа принтера зависит ТО и обязательные уточнения.', script: 'Подскажите, пожалуйста, бренд и модель вашего устройства.', checks: ['Бренд и модель обязательны.', 'Принтеры и плоттеры принимаем только в Москве и Санкт-Петербурге.', 'Работаем только с выездом.'], options: [{ label: 'Лазерный принтер или МФУ', next: 'laser' }, { label: 'Струйный принтер или МФУ', next: 'ink' }, { label: 'Плоттер', next: 'ink' }] },
    { id: 'laser', title: 'Лазерный принтер или МФУ', question: 'Определите неисправность и проверьте стоп-факторы в ЛК.', script: 'Что за неисправность и как она себя проявляет?', checks: ['Лазерное МФУ — ТО 7.', 'Лазерный принтер — ТО 12.', 'Сразу проверьте стоп-факторы в ЛК.'], options: [{ label: 'Неисправность разрешена в ЛК', next: 'printer-city' }, { label: 'Нужно уточнить в ЛК', next: 'lk-printer' }] },
    { id: 'ink', title: 'Струйное устройство или плоттер', question: 'Для струйной техники важен срок последней печати.', script: 'Что за неисправность и как она себя проявляет? А когда вы печатали в последний раз?', checks: ['Струйный принтер/МФУ — ТО 522.', 'Плоттер — ТО 761.', 'При простое от 6 месяцев предупредите о головке.'], options: [{ label: 'Печатали менее 6 месяцев назад', next: 'printer-city' }, { label: 'Не печатали 6 месяцев и более', next: 'dry-head' }, { label: 'Не помнят', next: 'dry-head' }] },
    { id: 'dry-head', title: 'Предупредите о печатающей головке', question: 'Не фиксируйте неисправность заранее, но обязательно озвучьте риск и диапазон стоимости.', script: 'Важно предупредить: при простое от шести месяцев в струйных устройствах могут засохнуть печатающие головки. Работа по замене — от 1 500 рублей, сама головка — от 3 500 рублей.', checks: ['Стоимость берите только из актуального ЛК.', 'Не обещайте замену до диагностики.', 'Не фиксируйте цену «от».'], options: [{ label: 'Клиент согласен с условиями', next: 'printer-city' }] },
    { id: 'lk-printer', title: 'Проверьте стоп-факторы принтера', question: 'Если проблема не очевидна, сначала сверяйтесь с ЛК.', script: 'Сейчас уточню по модели и описанию неисправности, можно ли оформить выезд.', checks: ['Новый принтер не видит ПК — проверить сценарий настройки.', 'Отдельную запчасть без техники не оформлять.', 'Крышка и корпус — проверить актуальный ТО.'], options: [{ label: 'Оформление разрешено', next: 'printer-city' }, { label: 'Не ремонтируем', result: { type: 'stop', title: 'Не оформляйте заказ', subtype: 'Не ремонтируем', classifier: 'По актуальному стоп-листу ЛК', action: 'Указать оборудование и конкретную причину в комментарии карты.' } }] },
    { id: 'printer-city', title: 'Город, зона и дата', question: 'Условия выезда нужно проговорить только после проверки города.', script: 'Подскажите, где территориально находится техника? Я проверю зону выезда и сориентирую вас по времени приезда мастера.', checks: ['Москва и Санкт-Петербург — только выезд.', 'В Санкт-Петербурге используйте встроенную карту зоны выезда, не Яндекс.Карты.', 'Оформляем только на текущий и следующий день.', 'Позже — карта, договорённость и перезвон накануне.'], options: [{ label: 'Сегодня или завтра, зона подходит', next: 'printer-finish' }, { label: 'Нужна более поздняя дата', result: { type: 'warning', title: 'Поставьте на перезвон', subtype: 'Новое обращение', classifier: 'Долгосрочный заказ', action: 'Заполнить карту, зафиксировать дату и поставить на перезвон.' } }, { label: 'Зона не подходит', result: { type: 'stop', title: 'Не оформляйте из-за дальности', subtype: 'Стоп фактор', classifier: 'Дальность', action: 'Закрыть карту корректным классификатором.' } }] },
    { id: 'printer-finish', title: 'Завершите оформление', question: 'Перед финалом проверьте поля карты и обязательную реплику.', script: 'Мастер подъедет в согласованный день. Убедительная просьба до приезда технику не использовать, чтобы избежать дополнительных поломок.', checks: ['Заполнить контрагента.', 'Указать тип оборудования.', 'Кратко описать неисправность в поле обращения.', 'Озвучить запрет на использование техники.'], options: [{ label: 'Оформление завершено', result: { type: 'success', title: 'Заявка готова', subtype: 'Новое обращение', classifier: 'По фактическому итогу', action: 'Проверить карту и сохранить заказ.' } }] }
  ],
  tv: [
    { title: 'Выберите ситуацию', question: 'Выберите ближайшее описание проблемы телевизора.', script: 'Подскажите, пожалуйста, что именно происходит с телевизором и как это проявляется?', checks: ['Уточните марку, модель и диагональ.', 'Проверьте стоп-факторы в ЛК.', 'Для ТВ до 15 дюймов зафиксируйте диагональ в комментарии.'], options: [{ label: 'Пульт не работает', next: 'remote' }, { label: 'Настройка или каналы', next: 'settings' }, { label: 'Матрица или экран', next: 'matrix' }, { label: 'Модуль, прошивка или Wi-Fi', next: 'module' }, { label: 'Нет сигнала', next: 'signal' }] },
    { id: 'remote', title: 'Пульт или управление', question: 'Отделите ремонт пульта от настройки поддерживаемого умного пульта.', script: 'Подскажите, пожалуйста, телевизор можно переключать кнопками на самом корпусе?', checks: ['Пульты не ремонтируем.', 'Если речь о поддерживаемом умном пульте, проверить сценарий настройки.', 'Если телевизор работает кнопками, пульт не является неисправностью телевизора.'], options: [{ label: 'Нужен ремонт пульта', result: { type: 'stop', title: 'Пульт не ремонтируем', subtype: 'Не ремонтируем', classifier: 'Пульт', action: 'Корректно объяснить ограничение и закрыть обращение.' } }, { label: 'Нужна настройка умного пульта', result: { type: 'success', title: 'Проверьте ТО настройки', subtype: 'Новое обращение', classifier: 'Настройка умного пульта', action: 'Открыть актуальный ТО настройки и оформить только по ЛК.' } }] },
    { id: 'settings', title: 'Настройка телевизора', question: 'Уточните, что именно нужно настроить.', script: 'Уточните, пожалуйста, что именно нужно настроить: каналы, пульт или другую функцию телевизора?', checks: ['Настройка каналов — ТО 934.', 'Очистку памяти не относить к ТО 934 без подтверждения в ЛК.', 'Перед оформлением сверить актуальный ТО.'], options: [{ label: 'Настройка каналов', result: { type: 'success', title: 'Оформляйте настройку каналов', subtype: 'Новое обращение', classifier: 'ТО 934', action: 'Оформить по ЛК. Для этой услуги не нужна фраза про «не трогать технику».' } }, { label: 'Другая настройка', next: 'lk-tv' }] },
    { id: 'matrix', title: 'Матрица или экран', question: 'Трещина, паутинка и прыгающее изображение могут указывать на матрицу.', script: 'Уточните, пожалуйста: есть трещина, паутинка или другое повреждение изображения? Какая диагональ телевизора?', checks: ['В Москве предложить замену матрицы только по актуальному ТО и условиям ЛК.', 'В Санкт-Петербурге матрица — стоп-фактор.', 'Если клиент отказался от условий, выбрать корректный стоп-фактор.', 'Защитное стекло отдельно не обещать — проверить как матрицу.'], options: [{ label: 'Москва, условия подходят', result: { type: 'success', title: 'Предложите замену матрицы', subtype: 'Новое обращение', classifier: 'Актуальный ТО матрицы из ЛК', action: 'Оформить только после проверки цены и условий в ЛК.' } }, { label: 'Санкт-Петербург или условия не подходят', result: { type: 'stop', title: 'Матрица — стоп-фактор', subtype: 'Стоп фактор', classifier: 'Матрица', action: 'Не оформлять. Выбрать корректный классификатор по городу и причине.' } }] },
    { id: 'module', title: 'Модуль, Wi-Fi или прошивка', question: 'Уточните, какая именно часть телевизора неисправна.', script: 'Подскажите, пожалуйста, что именно неисправно: модуль платы, Wi-Fi или требуется обновление программного обеспечения?', checks: ['Модули плат под замену проверять по ЛК.', 'Wi-Fi-модуль можно описать через «Нет сигнала», если это разрешено ЛК.', 'Прошивку не обещать только через флешку — способ определяет мастер.'], options: [{ label: 'Разрешено в ЛК', next: 'tv-finish' }, { label: 'В ЛК нет подходящей услуги', result: { type: 'warning', title: 'Не обещайте ремонт без проверки', subtype: 'Не ремонтируем или консультация', classifier: 'По актуальному ЛК', action: 'Поставить на перезвон или выбрать подтип после уточнения у руководителя.' } }] },
    { id: 'signal', title: 'Нет сигнала', question: 'Нужно понять: проблема только у этого телевизора или у всего дома.', script: 'Подскажите, пожалуйста, сигнал пропал только на вашем телевизоре или у соседей тоже?', checks: ['Если нет сигнала у всего подъезда, это не индивидуальный ремонт телевизора.', 'Если проблема в модуле телевизора, подробно укажите это в поле обращения.', 'Проверьте актуальный ЛК.'], options: [{ label: 'Проблема только у клиента', next: 'tv-finish' }, { label: 'Нет сигнала у всего подъезда', result: { type: 'stop', title: 'Обратитесь к провайдеру', subtype: 'Не ремонтируем', classifier: 'Нет сигнала у всего подъезда', action: 'Не оформлять ремонт телевизора.' } }] },
    { id: 'lk-tv', title: 'Проверьте актуальный ЛК', question: 'Не подставляйте ближайший ТО по смыслу — сначала найдите точную услугу.', script: 'Сейчас проверю по описанию, какой вариант оформления подходит именно для вашей модели.', checks: ['Цены и ТО только из ЛК.', 'Не фиксируйте цену «от».', 'Если нет подходящего ТО, не обещайте оформление.'], options: [{ label: 'Нашли подходящий ТО', next: 'tv-finish' }, { label: 'Нужна помощь', nextRoute: 'objection' }] },
    { id: 'tv-finish', title: 'Завершите оформление ТВ', question: 'Перед сохранением карты проверьте обязательные поля и финальную реплику.', script: 'До приезда мастера, пожалуйста, не используйте и не разбирайте телевизор, чтобы не появились дополнительные повреждения. Всего доброго!', checks: ['Заполнить имя и город.', 'Указать бренд, модель и диагональ.', 'Кратко описать проявление неисправности.', 'Проверить стоп-факторы и актуальный ТО.'], options: [{ label: 'Оформление завершено', result: { type: 'success', title: 'Заявка по ТВ готова', subtype: 'Новое обращение', classifier: 'По фактическому итогу', action: 'Проверить карту и сохранить заказ.' } }] }
  ],
  pck: [
    { title: 'Проверьте актуальность', question: 'ПЦК нельзя отправлять автоматически — сначала подтвердите, что ремонт нужен.', script: 'Подскажите, пожалуйста, ремонт для вас ещё актуален?', checks: ['Если не актуально и консультации не было — отдельный классификатор после ПЦК.', 'Если актуально — предупредите о звонке специалиста.'], options: [{ label: 'Ремонт актуален', next: 'pck-callback' }, { label: 'Не актуально', result: { type: 'warning', title: 'Закройте ПЦК корректно', subtype: 'Не уговорил', classifier: 'Клиенту не актуально (обращение после ПЦК)', action: 'Консультацию не фиксировать, выбрать именно этот классификатор.' } }] },
    { id: 'pck-callback', title: 'Предупредите о перезвоне', question: 'Клиент должен понимать, кто и когда ему перезвонит.', script: 'Профильный специалист перезвонит вам в течение 10 минут. Уточню номер для обратной связи: первые шесть цифр — ______.', checks: ['Сверьте первые 6 цифр с номером в карте.', 'Передайте карту в целевую очередь.', 'Получивший ПЦК оператор обрабатывает его сразу.'], options: [{ label: 'ПЦК отправлен', result: { type: 'success', title: 'ПЦК подготовлен', subtype: 'Перезвон целевому клиенту', classifier: 'Актуальный ремонт', action: 'Передать в целевую очередь и не оставлять карту без обработки.' } }] }
  ],
  objection: [
    { title: 'Узнайте причину отказа', question: 'Если решить проблему можем, но заказ не оформлен, сначала выясните настоящее возражение.', script: 'Подскажите, пожалуйста, что именно вас сейчас останавливает от оформления заказа?', checks: ['Не ориентируйте клиента на отказ.', 'Запишите точную причину, а не «неизвестно».'], options: [
      { label: 'Цена или условия', next: 'objection-benefits' },
      { label: 'Дата и время', next: 'objection-benefits' },
      { label: 'Нужна точная цена', result: { type: 'warning', title: 'Отработайте ожидание цены', subtype: 'Не уговорил', classifier: 'Нужна точная фиксированная цена', action: 'Объяснить диагностику и снова предложить оформить заказ.' } }
    ] },
    { id: 'objection-benefits', title: 'Отработайте возражение', question: 'Предложите скидку, гибкую дату и преимущества сервиса.', script: 'Давайте оформим заявку, а дату и время при необходимости можно будет скорректировать. Выезд бесплатный, диагностика оплачивается только при отказе от ремонта, а оплачивается только ремонт. Мы работаем более 15 лет и даём документальную гарантию на работы и запчасти.', checks: ['Не обещайте фиксированную цену.', 'Скидку предлагайте по действующему правилу.', 'Снова предложите оформить заказ.'], options: [{ label: 'Клиент согласен', result: { type: 'success', title: 'Возражение отработано', subtype: 'Новое обращение', classifier: 'По фактическому итогу', action: 'Оформить заказ и заполнить обязательные поля карты.' } }, { label: 'Клиент отказался', next: 'objection-classifier' }] },
    { id: 'objection-classifier', title: 'Выберите точную причину', question: 'Классификатор должен соответствовать реальной причине отказа.', script: 'Предложите клиенту перезвонить, когда решение станет актуальным.', checks: ['Не выбирать «причина отказа неизвестна».', 'Для ПЦК использовать специальный классификатор.', 'Для гарантийной техники использовать ветку заводской гарантии.'], options: [{ label: 'Дорого', result: { type: 'warning', title: 'Карта закрывается как отказ', subtype: 'Не уговорил', classifier: 'Не устроила цена услуги', action: 'Заполнить причину и основные поля карты.' } }, { label: 'Слишком долго ждать', result: { type: 'warning', title: 'Карта закрывается как отказ', subtype: 'Не уговорил', classifier: 'Долго ждать выезд', action: 'Заполнить причину и основные поля карты.' } }, { label: 'Услуга больше не нужна', result: { type: 'warning', title: 'Карта закрывается как отказ', subtype: 'Не уговорил', classifier: 'Услуги не актуальны', action: 'Указать оборудование и факт консультации.' } }] }
  ],
  guarantee: [
    { title: 'Подтвердите гарантийную технику', question: 'Если проблему можем решить, проводим такую же отработку возражения, но объясняем преимущества по срокам.', script: 'Подскажите, пожалуйста, что именно вас сейчас останавливает от оформления заказа?', checks: ['Заполнить контрагента, тип оборудования и поле обращения.', 'Не переводить гарантийный звонок в обычную консультацию, если заказ не оформлен.'], options: [{ label: 'Клиент сомневается', next: 'guarantee-benefit' }, { label: 'Клиент готов оформить', result: { type: 'success', title: 'Оформляйте гарантийный ремонт', subtype: 'Новое обращение', classifier: 'Заводская гарантия', action: 'Проверить ЛК и оформить по действующим условиям.' } }] },
    { id: 'guarantee-benefit', title: 'Объясните разницу по срокам', question: 'Официальная гарантия может занимать 20–40 дней и не всегда признаёт случай гарантийным.', script: 'Через официального производителя диагностика может занимать от 20 до 40 дней, и не всегда неисправность признают гарантийным случаем. Мы можем оперативно решить вопрос в рамках одного выезда.', checks: ['Предложить скидку по действующему правилу.', 'Предложить оформить заказ с корректировкой даты и времени.', 'Рассказать о гарантии на работы и запчасти.'], options: [{ label: 'Согласен', result: { type: 'success', title: 'Гарантийный заказ оформляется', subtype: 'Заводская гарантия', classifier: 'По фактическому итогу', action: 'Заполнить обязательные поля карты и оформить заказ.' } }, { label: 'Отказался', result: { type: 'warning', title: 'Закройте гарантийную карту', subtype: 'Заводская гарантия', classifier: 'Не устроила цена услуги или другое точное основание', action: 'Выбрать реальную причину отказа, не ставить «Консультация».' } }] }
  ],
  stop: [
    { title: 'Выберите стоп-фактор', question: 'Стоп-фактор означает, что заказ сейчас оформлять нельзя.', script: 'Я проверю условия по вашему адресу и оборудованию, чтобы корректно сориентировать вас.', checks: ['Причину нужно выбрать точно.', 'Стоп-факторы по направлению смотрите в ЛК.', 'Не заменяйте причину на «Дальность», если проблема в другом.'], options: [{ label: 'Дальность', result: { type: 'stop', title: 'Заказ не оформляем', subtype: 'Стоп фактор', classifier: 'Дальность', action: 'Закрыть обращение корректной причиной.' } }, { label: 'Клиент младше 18 лет', next: 'minor' }, { label: 'Признаки опьянения', next: 'intoxication' }, { label: 'Оборудование в стоп-листе', result: { type: 'stop', title: 'Заказ не оформляем', subtype: 'Стоп фактор', classifier: 'Стоп-фактор по направлению из ЛК', action: 'Указать конкретное оборудование или услугу в комментарии.' } }] },
    { id: 'minor', title: 'Проверьте возраст', question: 'Не делайте вывод только по голосу — задайте прямой вопрос.', script: 'Подскажите, пожалуйста, вам уже исполнилось 18 лет?', checks: ['Если нет — нужен взрослый, который будет встречать мастера.', 'Не оформлять заказ без подтверждения взрослого.'], options: [{ label: 'Нет, нужен взрослый', result: { type: 'stop', title: 'Нужен взрослый представитель', subtype: 'Стоп фактор', classifier: 'Несовершеннолетние', action: 'Попросить взрослого связаться с колл-центром.' } }, { label: 'Да, можно продолжать', nextRoute: 'new' }] },
    { id: 'intoxication', title: 'Корректно уточните состояние', question: 'По голосу нельзя ставить стоп-фактор без уточнения.', script: 'Простите, уточню: вы сегодня не употребляли алкоголь?', checks: ['При отрицательном ответе продолжаем оформление.', 'При положительном ответе предложить перезвонить завтра.', 'Не обсуждать состояние клиента в резкой форме.'], options: [{ label: 'Нет', nextRoute: 'new' }, { label: 'Да', result: { type: 'stop', title: 'Перенесите оформление на завтра', subtype: 'Стоп фактор', classifier: 'Алкогольное/наркотическое опьянение', action: 'Предложить клиенту перезвонить завтра.' } }] }
  ],
  missed: [
    { title: 'Сделайте до трёх попыток', question: 'Первый недозвон не является финальным результатом.', script: 'Мы повторно свяжемся с вами по регламенту, чтобы уточнить актуальность обращения.', checks: ['Выполнить до 3 попыток дозвона.', 'Если дозвонились — определить фактический тип обращения.', 'Если клиенту не актуально — обязательно уточнить оборудование.'], options: [{ label: 'Дозвонились, услуга актуальна', nextRoute: 'new' }, { label: 'Не дозвонились после 3 попыток', result: { type: 'warning', title: 'Завершите регламент недозвона', subtype: 'Спам', classifier: 'Недозвон', action: 'Закрыть карту после выполнения трёх попыток.' } }, { label: 'Дозвонились, услуга не актуальна', result: { type: 'warning', title: 'Уточните оборудование', subtype: 'Не уговорил', classifier: 'Услуги не актуальны', action: 'Использовать этот исход, если оборудование входит в наши работы.' } }] }
  ],
  'non-target': [
    { title: 'Определите нецелевой тип', question: 'Выберите точную причину, чтобы не смешивать спам, недозвон и текущий заказ.', script: 'Уточните, пожалуйста, чем мы можем помочь и по какому вопросу вы звоните?', checks: ['Ошибка номера — «Ошибся».', 'Текущий заказ не закрывать обычным спамом.', 'Предложение сотрудничества — отдельный классификатор.'], options: [{ label: 'Ошибся номером или не наша услуга', result: { type: 'warning', title: 'Нецелевое обращение', subtype: 'Спам', classifier: 'Ошибся', action: 'Закрыть с точной причиной.' } }, { label: 'Предложение рекламы или сотрудничества', result: { type: 'warning', title: 'Нецелевое обращение', subtype: 'Спам', classifier: 'Сотрудничество', action: 'Закрыть с классификатором сотрудничества.' } }, { label: 'Хочет купить расходник', result: { type: 'warning', title: 'Нецелевое обращение', subtype: 'Спам', classifier: 'Купить расходник/аксессуар', action: 'Не оформлять ремонт.' } }, { label: 'Вакансия', result: { type: 'success', title: 'Передайте данные в отдел кадров', subtype: 'Вакансии', classifier: 'Вакансия', action: 'Уточнить имя, должность и телефон.' } }] }
  ],
  current: [
    { title: 'Определите текущий заказ', question: 'Новые продажи и вопросы по уже оформленному заказу обрабатываются по-разному.', script: 'Понимаю. Сейчас передам вас в отдел сопровождения по текущему заказу.', checks: ['Не консультировать по текущему заказу самостоятельно.', 'Не тратить время на текучку.', 'Если перевод не состоялся — выбрать исход ниже.'], options: [{ label: 'Перевод в сопровождение успешен', result: { type: 'success', title: 'Перевод выполнен', subtype: 'Текущий заказ', classifier: 'Перевод в сопровождение', action: 'Передать звонок и завершить работу с картой.' } }, { label: 'Клиент ждёт обратный звонок', result: { type: 'warning', title: 'Передайте информацию менеджеру', subtype: 'Ждет обратный звонок', classifier: 'Текущий заказ', action: 'Указать номер заказа и суть запроса.' } }, { label: 'Ответил самостоятельно, обратный звонок не нужен', result: { type: 'warning', title: 'Закройте дубль текучки', subtype: 'Спам', classifier: 'Спам – дубль текучка', action: 'Обязательно указать номер заказа.' } }] }
  ]
};

const state = { routeId: null, stepIndex: 0, history: [], query: '', ribbonVisible: true };

function safeText(value) { return String(value ?? ''); }
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = safeText(text);
  return node;
}
function icon(name) { return ICONS[name] || ICONS.info; }
function getRoute(id) { return routes.find((route) => route.id === id); }
function getCurrentSteps() { return steps[state.routeId] || []; }
function getCurrentStep() { return getCurrentSteps()[state.stepIndex]; }
function showToast(message) {
  const toast = $('toast');
  toast.textContent = safeText(message);
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function renderNav() {
  const nav = $('route-nav');
  nav.replaceChildren();
  routes.forEach((route) => {
    const button = make('button', state.routeId === route.id ? 'active' : '');
    button.type = 'button';
    button.innerHTML = icon(route.icon);
    const label = make('span', 'nav-label', route.label);
    button.appendChild(label);
    button.addEventListener('click', () => openRoute(route.id));
    nav.appendChild(button);
  });
  $('route-count').textContent = String(routes.length);
}

function renderCrumbs(currentLabel = '') {
  const crumbs = $('crumbs');
  crumbs.replaceChildren();
  crumbs.appendChild(make('span', '', 'Навигатор'));
  if (currentLabel) {
    crumbs.appendChild(make('span', 'crumb-sep', '/'));
    crumbs.appendChild(make('strong', '', currentLabel));
  }
}

function renderHome() {
  state.routeId = null;
  state.stepIndex = 0;
  state.history = [];
  renderCrumbs();
  const view = $('app-view');
  view.replaceChildren();
  const heading = make('div', 'section-heading');
  const headingCopy = document.createElement('div');
  headingCopy.appendChild(make('h2', '', 'С чего начнём звонок?'));
  headingCopy.appendChild(make('p', '', 'Выберите ситуацию — дальше останутся только нужные вопросы и действия.'));
  heading.appendChild(headingCopy);
  heading.appendChild(make('span', 'section-count', `${routes.length} рабочих маршрутов`));
  view.appendChild(heading);

  const grid = make('div', 'route-grid');
  routes.forEach((route) => {
    const card = make('button', `route-card ${route.tone}`);
    card.type = 'button';
    const top = make('div', 'card-topline');
    const cardIcon = make('div', 'card-icon');
    cardIcon.innerHTML = icon(route.icon);
    top.appendChild(cardIcon);
    top.appendChild(make('span', 'card-kicker', 'Открыть маршрут'));
    card.appendChild(top);
    card.appendChild(make('h3', '', route.title));
    card.appendChild(make('p', '', route.description));
    const footer = make('div', 'card-footer', 'Начать маршрут');
    footer.insertAdjacentHTML('beforeend', icon('arrow'));
    card.appendChild(footer);
    card.addEventListener('click', () => openRoute(route.id));
    grid.appendChild(card);
  });
  view.appendChild(grid);
}

function renderSideCards(route) {
  const stack = make('div', 'side-stack');
  const rules = make('div', 'side-card');
  rules.appendChild(make('h4', '', 'Постоянно держите в голове'));
  [
    'Сначала имя и город.',
    'Цены и ТО только из ЛК.',
    'Не фиксировать цену «от».',
    'Перед выездом — не трогать технику.'
  ].forEach((text) => {
    const row = make('div', 'mini-rule');
    row.insertAdjacentHTML('beforeend', icon('check'));
    row.appendChild(make('span', '', text));
    rules.appendChild(row);
  });
  stack.appendChild(rules);
  const tags = make('div', 'side-card');
  tags.appendChild(make('h4', '', 'В этом маршруте'));
  const tagList = make('div', 'tag-list');
  (route.tags || []).forEach((tag) => tagList.appendChild(make('span', 'tag', tag)));
  tags.appendChild(tagList);
  stack.appendChild(tags);
  return stack;
}

function renderStep() {
  const route = getRoute(state.routeId);
  const current = getCurrentStep();
  if (!route || !current) return renderHome();
  renderCrumbs(route.label);
  const view = $('app-view');
  view.replaceChildren();
  const header = make('div', 'route-head');
  const copy = document.createElement('div');
  copy.appendChild(make('div', 'eyebrow', 'Пошаговый маршрут'));
  copy.appendChild(make('h2', '', route.title));
  copy.appendChild(make('p', '', route.description));
  header.appendChild(copy);
  const actions = make('div', 'route-actions');
  const reset = make('button', 'secondary-button');
  reset.type = 'button'; reset.innerHTML = icon('reset'); reset.appendChild(document.createTextNode('Сбросить'));
  reset.addEventListener('click', () => openRoute(state.routeId));
  actions.appendChild(reset);
  header.appendChild(actions);
  view.appendChild(header);

  const track = make('div', 'progress-track');
  const fill = make('div', 'progress-fill');
  fill.style.width = `${Math.max(8, ((state.stepIndex + 1) / getCurrentSteps().length) * 100)}%`;
  track.appendChild(fill); view.appendChild(track);

  const layout = make('div', 'step-layout');
  const card = make('article', 'step-card');
  const meta = make('div', 'step-meta');
  meta.appendChild(make('span', 'step-number', String(state.stepIndex + 1).padStart(2, '0')));
  meta.appendChild(make('span', '', `Шаг ${state.stepIndex + 1} из ${getCurrentSteps().length}`));
  card.appendChild(meta);
  card.appendChild(make('h3', '', current.title));
  card.appendChild(make('p', 'step-question', current.question));
  const script = make('div', 'script-box');
  script.appendChild(make('div', 'script-label', 'Готовая реплика'));
  script.appendChild(make('div', 'script-text', current.script));
  card.appendChild(script);
  if (current.checks?.length) {
    const checks = make('div', 'check-list');
    current.checks.forEach((check) => {
      const row = make('div', 'check-row');
      row.insertAdjacentHTML('beforeend', icon('check'));
      row.appendChild(make('span', '', check));
      checks.appendChild(row);
    });
    card.appendChild(checks);
  }
  card.appendChild(make('div', 'options-title', 'Что произошло дальше?'));
  const optionList = make('div', 'option-list');
  (current.options || []).forEach((option) => {
    const button = make('button', 'option-button');
    button.type = 'button';
    button.appendChild(make('span', '', option.label));
    button.insertAdjacentHTML('beforeend', icon('arrow'));
    button.addEventListener('click', () => chooseOption(option));
    optionList.appendChild(button);
  });
  card.appendChild(optionList);
  const footer = make('div', 'step-footer');
  const back = make('button', 'secondary-button', 'Назад');
  back.type = 'button'; back.innerHTML = icon('back'); back.appendChild(document.createTextNode('Назад'));
  back.disabled = state.history.length === 0;
  back.style.opacity = back.disabled ? '.45' : '1';
  back.addEventListener('click', goBack);
  footer.appendChild(back);
  footer.appendChild(make('span', 'step-footer-note', 'Выберите вариант — навигатор продолжит маршрут'));
  card.appendChild(footer);
  layout.appendChild(card);
  layout.appendChild(renderSideCards(route));
  view.appendChild(layout);
}

function renderResult(result) {
  const route = getRoute(state.routeId);
  renderCrumbs(route?.label || 'Итог');
  const view = $('app-view');
  view.replaceChildren();
  const header = make('div', 'route-head');
  const copy = document.createElement('div');
  copy.appendChild(make('div', 'eyebrow', 'Маршрут завершён'));
  copy.appendChild(make('h2', '', 'Итог по обращению'));
  copy.appendChild(make('p', '', 'Используйте эту карточку как последний контроль перед закрытием карты.'));
  header.appendChild(copy);
  const actions = make('div', 'route-actions');
  const reset = make('button', 'secondary-button');
  reset.type = 'button'; reset.innerHTML = icon('reset'); reset.appendChild(document.createTextNode('Начать заново'));
  reset.addEventListener('click', () => openRoute(state.routeId));
  actions.appendChild(reset); header.appendChild(actions); view.appendChild(header);

  const card = make('article', 'result-card');
  const banner = make('div', `result-banner ${result.type === 'stop' ? 'stop' : result.type === 'warning' ? 'warning' : ''}`);
  const bannerIcon = make('div', 'result-banner-icon');
  bannerIcon.innerHTML = icon(result.type === 'stop' ? 'alert' : result.type === 'warning' ? 'info' : 'check');
  banner.appendChild(bannerIcon);
  const bannerCopy = document.createElement('div');
  bannerCopy.appendChild(make('strong', '', result.title));
  bannerCopy.appendChild(make('span', '', result.action));
  banner.appendChild(bannerCopy); card.appendChild(banner);

  const fields = make('div', 'result-grid');
  [['Итоговый подтип', result.subtype], ['Классификатор', result.classifier], ['Что сделать с картой', result.action], ['Контроль', result.type === 'stop' ? 'Заказ не оформлять' : 'Сверить поля и сохранить результат']].forEach(([label, value]) => {
    const field = make('div', 'result-field');
    field.appendChild(make('label', '', label));
    field.appendChild(make('strong', '', value));
    fields.appendChild(field);
  });
  card.appendChild(fields);
  const finalScript = make('div', 'result-script');
  const scriptBox = make('div', 'script-box');
  scriptBox.appendChild(make('div', 'script-label', 'Финальная реплика')); 
  scriptBox.appendChild(make('div', 'script-text', result.type === 'stop' ? 'К сожалению, сейчас мы не сможем оформить выезд по этому обращению. Спасибо за понимание.' : 'Спасибо, информация зафиксирована. Мы готовы помочь в рамках согласованных условий.'));
  finalScript.appendChild(scriptBox); card.appendChild(finalScript);
  const resultActions = make('div', 'result-actions');
  const back = make('button', 'secondary-button', 'Вернуться к шагу');
  back.type = 'button'; back.innerHTML = icon('back'); back.appendChild(document.createTextNode('Вернуться к шагу'));
  back.addEventListener('click', () => {
    const previous = state.history.pop();
    if (previous) {
      state.routeId = previous.routeId;
      state.stepIndex = previous.stepIndex;
    }
    renderStep();
  });
  resultActions.appendChild(back);
  const home = make('button', 'primary-button', 'Выбрать новый маршрут');
  home.type = 'button'; home.innerHTML = icon('route'); home.appendChild(document.createTextNode('Выбрать новый маршрут'));
  home.addEventListener('click', renderHome); resultActions.appendChild(home);
  card.appendChild(resultActions); view.appendChild(card);
}

function chooseOption(option) {
  if (option.nextRoute) {
    openRoute(option.nextRoute);
    return;
  }
  if (option.result) {
    state.history.push({ routeId: state.routeId, stepIndex: state.stepIndex });
    renderResult(option.result);
    return;
  }
  if (option.next) {
    state.history.push({ routeId: state.routeId, stepIndex: state.stepIndex });
    const nextIndex = getCurrentSteps().findIndex((step) => step.id === option.next);
    if (nextIndex >= 0) state.stepIndex = nextIndex;
    else state.stepIndex += 1;
    renderStep();
  }
}

function goBack() {
  const previous = state.history.pop();
  if (!previous) return;
  state.routeId = previous.routeId;
  state.stepIndex = previous.stepIndex;
  renderStep();
}

function openRoute(id) {
  state.routeId = id;
  state.stepIndex = 0;
  state.history = [];
  renderNav();
  renderStep();
  $('sidebar').classList.remove('open');
}

function handleSearch(event) {
  state.query = event.target.value.trim().toLowerCase();
  if (!state.query) return renderHome();
  renderCrumbs('Поиск');
  const view = $('app-view'); view.replaceChildren();
  const heading = make('div', 'section-heading');
  const copy = document.createElement('div');
  copy.appendChild(make('h2', '', 'Результаты поиска'));
  copy.appendChild(make('p', '', 'Ищем по названию, описанию и тегам маршрута.'));
  heading.appendChild(copy); view.appendChild(heading);
  const matches = routes.filter((route) => `${route.title} ${route.description} ${route.tags.join(' ')}`.toLowerCase().includes(state.query));
  if (!matches.length) { view.appendChild(make('div', 'search-empty', 'Ничего не найдено. Попробуйте «принтер», «ПЦК», «матрица» или «текущий заказ».')); return; }
  const grid = make('div', 'route-grid');
  matches.forEach((route) => {
    const card = make('button', `route-card ${route.tone}`); card.type = 'button';
    const top = make('div', 'card-topline'); const cardIcon = make('div', 'card-icon'); cardIcon.innerHTML = icon(route.icon); top.appendChild(cardIcon); top.appendChild(make('span', 'card-kicker', 'Открыть маршрут')); card.appendChild(top);
    card.appendChild(make('h3', '', route.title)); card.appendChild(make('p', '', route.description));
    const footer = make('div', 'card-footer', 'Начать маршрут'); footer.insertAdjacentHTML('beforeend', icon('arrow')); card.appendChild(footer);
    card.addEventListener('click', () => openRoute(route.id)); grid.appendChild(card);
  });
  view.appendChild(grid);
}

$('route-search').addEventListener('input', handleSearch);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== $('route-search')) { event.preventDefault(); $('route-search').focus(); }
  if (event.key === 'Escape') { $('route-search').value = ''; state.query = ''; renderHome(); }
});
$('mobile-menu').addEventListener('click', () => $('sidebar').classList.toggle('open'));
$('ribbon-close').addEventListener('click', () => { $('rule-ribbon').classList.add('hidden'); });
$('rules-button').addEventListener('click', () => {
  $('rule-ribbon').classList.remove('hidden');
  showToast('Главные правила снова показаны');
});

renderNav();
renderHome();
