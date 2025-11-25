/** @type {import("stylelint").Config} */
export default {
  customSyntax: "postcss-scss",
  "extends": ["stylelint-config-standard", "stylelint-config-recommended-scss"],
  "plugins": ["stylelint-selector-bem-pattern"],
  "rules": {
    // permitir unidades modernas para container queries
    "unit-allowed-list": [
      "%", "deg", "px", "rem", "em", "ms", "s", "vw", "vh", "vmin", "vmax",
      "cqw", "cqh", "fr", "dvh"
    ],

    "import-notation": null,
    "no-invalid-position-at-import-rule": null,
    "media-feature-range-notation": null,

    // permitir at-rules modernos
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "use", "forward", "include", "mixin", "function",
        "container", "container-query",
        "layer", "supports", "media", "layer"
      ],
    }],

    // permitir propiedades modernas
    "property-no-unknown": [true, {
      "ignoreProperties": ["container-type", "container-name", "container"]
    }],

    // BEM rules
    "plugin/selector-bem-pattern": {
      preset: "bem",
      "componentName": "[a-z]+",
      "componentSelectors": {
        "initial": "^\\.{componentName}(?:-[a-z]+)?$",
        "combined": "^\\.combined-{componentName}-[a-z]+$"
      },
      "utilitySelectors": "^\\.util-[a-z]+$"
    },

    "selector-class-pattern":
      "^.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",

    "selector-nested-pattern":
      "^&(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*)?)?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$"
  }
};
