> Internationalization is an important feature that is used to overcome the language barrier among people who use a particular software application. For example, the application’s target users may speak different languages and have varying conventions for numbers, dates, or strings.

## Library versions

- [i18next](https://www.i18next.com/) (v19.8.4)
- [react-i18next](https://react.i18next.com/) (11.8.5)
- [i18next-http-backend](https://github.com/i18next/i18next-http-backend) (1.0.23)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) (6.0.1)

## How to translate with react-i18next

1. Import `useTranslation()` from `react-i18next`.
1. Access `t()` function via react-i18next’s `useTranslation()` react hook.
1. Use `t()` function. More information [here](https://www.i18next.com/overview/api#t)

Example:

```
import React from "react";
import { useTranslation } from "react-i18next";
// ...
export default function () {
  const { t } = useTranslation();
  return (
    <nav>
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong>{t("app_name", "Admin-boilerplate")}</strong>
        </a>
      </div>
    </nav>
  );
}
```

## Getting & Setting the Active Language

> We get the active language via the i18n.language property. We set it via the i18n.changeLanguage() method.

```
const { i18n } = useTranslation();

// Getting the active language
i18n.language // => "en" when active language is English

// Setting the active language
i18n.changeLanguage('ko');

i18n.language // => Now "ko"
```

## How to add supported languages

1. Open `src/config.js` file
2. Add more supported language to `supportedLngs`.

By default, Fallback language is english (`en`). For now, We supported for `en` and `ko` languages.
