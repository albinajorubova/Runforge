# AI_LOG

## Использованный инструмент

Codex на модели GPT-5

## Полезные запросы

### 1. Разбор и написание тестов

Запрос:

> Объясни, зачем в React-приложении нужны тесты и как они работают. Покажи, как с помощью Vitest и React Testing Library проверить фильтрацию запусков по статусу, поиск и открытие деталей запуска.

Контекст:

Я передала ai требования тестового задания и существующий тестовый файл. В приложении используется React Testing Library и локальный mock-сервис. Нужно было протестировать три пользовательских сценария: фильтрацию, поиск и открытие подробностей запуска.

### 2. Реализация дизайна 

Запрос:

> use coding rules
> Build a static frontend dashboard for a fictional developer tool called “Runforge”.
>
> The product is used to view AI agent runs. For now, focus only on the visual layout and responsive styling. Do not implement search, filtering, routing, modal behavior, API requests, or other interactive logic yet.
>
> Design direction:
>
> - Clean developer-tool dashboard
> - Warm off-white / cream page background
> - Dark navy sidebar and primary elements
> - White content surfaces
> - Subtle gray borders
> - Consistent spacing
> - Moderate border radius
> - Compact, professional typography
> - Avoid gradients, excessive shadows, glassmorphism, and decorative animations
> - The design should feel original. Do not copy any existing website pixel-for-pixel.
>
> Page layout:
>
> 1. Sidebar
>
> - Runforge logo at the top
> - “Workspace” section label
> - Navigation items:
>   - Runs — active
>   - Projects
>   - Devboxes
>   - Previews
>   - Snapshots
> - Settings item at the bottom
> - Use simple placeholder icons or an icon library if one is already installed
> - The active “Runs” item should have a light background and dark text
>
> 2. Top bar
>
> - Display the current project:
>   “Project / web-platform”
> - Add a small circular user avatar with initials on the right
>
> 3. Page heading
>
> - Title: “Runs”
> - Subtitle: “AI agent runs in the current project”
> - Display “6 runs” on the right
>
> 4. Static toolbar
>
> - Search input with the placeholder:
>   “Search by run name or repository”
> - Status buttons:
>   - All
>   - Queued
>   - Running
>   - Succeeded
>   - Failed
> - “All” should look selected
> - The controls should be visual only; do not add event handlers
>
> 5. Runs table
>    Create a responsive table with these columns:
>
> - Run
> - Repository / Branch
> - Status
> - Created
> - Duration
>
> Use realistic static mock data with at least six rows and all four statuses.
>
> Example runs:
>
> - Auth refactor — web-platform — refactor/auth — running
> - Fix checkout tests — payments — fix/checkout — succeeded
> - Update dependencies — api-service — chore/deps — queued
> - Repair mobile header — storefront — fix/mobile-nav — failed
> - Improve API validation — api-service — feature/validation — succeeded
> - Add billing events — payments — feature/billing-events — queued
>
> Each row should show:
>
> - Run name
> - Small run ID below the name
> - Repository
> - Branch below the repository
> - Text status badge
> - Formatted creation date
> - Formatted duration or an em dash when unavailable
>
> Status badges:
>
> - Running: blue
> - Succeeded: green
> - Queued: yellow
> - Failed: red
> - Every badge must include a text label and must not rely only on color
>
> Responsive behavior:
>
> - The layout must remain usable from 360px width
> - On tablet screens, collapse the sidebar to an icon-only version
> - On mobile screens, hide the sidebar or replace it with a compact header
> - Replace the table with vertically stacked run cards on small screens
> - Do not allow the page itself to overflow horizontally
> - Search and filter controls may wrap into multiple rows
>
> Component structure:
>
> - App
> - Sidebar
> - Header
> - RunsHeader
> - RunsToolbar
> - RunsTable
> - RunCard
> - StatusBadge
>
> Implementation requirements:
>
> - Keep components small and clearly named
> - Store the static run data in a separate mock data file
> - Define a Run type and a RunStatus union type
> - Use semantic HTML
> - Add visible keyboard focus styles to controls
> - Keep the browser console free of warnings and errors
> - Do not put the entire application in App.tsx
> - Do not add functionality that was not requested
> - Do not install unnecessary dependencies
> - Do not create a backend
>
> Before finishing:
>
> - Run the project build
> - Fix TypeScript and build errors
> - Check the layout at desktop, tablet, and 360px mobile widths
> - Briefly list the files created or changed

Переданный контекст:

Я передала модель данных `Run`, список обязательных состояний и функциональные требования из задания - цвета и оставаться удобным на экранах шириной от 360 px.

### 3. Ускорение сборки проекта

Запрос:

> Реализуй проект Runforge в projects и подключим к гитхабу, Vite-проект с React, pnpm и TypeScript, module scss и biom для визуала кода файл биома я обновлю сама под себя

Переданный контекст:

Где создать проект.

## Ошибка или неудачное решение AI

AI помог быстро подготовить первоначальную версию проекта, но сгенерированный результат требовал ручной доработки. Некоторые компоненты получались слишком большими: в одном файле одновременно находились разметка, данные и логика интерфейса. Поэтому я дополнительно разбивала код на отдельные компоненты, выносила типы, mock-данные и вспомогательные функции в отдельные файлы.
