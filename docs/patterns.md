# Карта GoF-патернів

Цей файл — джерело правди про те, де і навіщо застосовано кожен патерн. Оновлювати
кожного разу, коли патерн додається або змінюється; коментар на UML-діаграмі класів
має відповідати цій таблиці.

| Патерн | Категорія | Де застосовано | Статус |
|---|---|---|---|
| Singleton | Creational | `AppConfig` (`apps/api/src/common/config/app-config.ts`) — приватний конструктор + статичний `getInstance()`, без DI-контейнера | реалізовано |
| Factory Method | Creational | `ContentFactory` (article/quiz/poll/gallery), `AccessPolicyFactory` | не реалізовано |
| Builder | Creational | `SpecialIssueBuilder` («Журнал місяця») | не реалізовано |
| Composite | Structural | `Issue` → `Rubric` → `Article`; `Collection` | не реалізовано |
| Proxy | Structural | `PremiumContentProxy` — приховує ексклюзивний контент | не реалізовано |
| Decorator | Structural | `ArticleView`: `AdInjectingDecorator`, `SponsorLabelDecorator` | не реалізовано |
| Adapter | Structural | Поширення в соцмережі: Facebook / X / Telegram | не реалізовано |
| State | Behavioural | Життєвий цикл статті: draft → review → published → archived | не реалізовано |
| Strategy | Behavioural | `AccessPolicy` (Free/Premium), алгоритми рекомендацій, вибір реклами | не реалізовано |
| Observer | Behavioural | Сповіщення: новий випуск, ексклюзив, акції партнерів, активація підписки | не реалізовано |
| Chain of Responsibility | Behavioural | Модерація коментарів: спам → лайка → посилання | не реалізовано |
| Template Method | Behavioural | Підрахунок результатів тестів і опитувань | не реалізовано |

## Ключовий сценарій «разом»

`ArticleReadingService.read()`:

```
Factory (створення контенту) → Strategy (визначення політики доступу)
  → Proxy (перевірка доступу до ексклюзиву) → Decorator (реклама/спонсорська мітка)
```

Цей сценарій демонструє, як патерни з різних категорій (creational, structural,
behavioural) співпрацюють в одному виклику, а не існують ізольовано.

## SOLID / GRASP — нотатки

Доповнювати цей розділ по мірі реалізації: які принципи SOLID і патерни GRASP
(Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism,
Protected Variations) явно простежуються в конкретних класах/модулях.
