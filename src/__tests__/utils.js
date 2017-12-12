import { getOptionsForFormatting } from "../utils";

const getPrettierOptionsFromESLintRulesTests = [
  {
    rules: {
      "max-len": [2, 120, 2],
      indent: [2, 2, { SwitchCase: 1 }],
      quotes: [2, "single", { avoidEscape: true, allowTemplateLiterals: true }],
      "comma-dangle": [
        2,
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline"
        }
      ],
      "object-curly-spacing": [2, "never"]
    },
    options: {
      printWidth: 120,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: "all",
      bracketSpacing: false
    }
  },
  {
    rules: { "object-curly-spacing": [2, "always"] },
    options: { bracketSpacing: true }
  },
  {
    rules: { "object-curly-spacing": [2, "never"] },
    options: { bracketSpacing: false }
  },
  { rules: { "max-len": 2 }, options: {} },
  {
    rules: { "comma-dangle": [2, "never"] },
    options: { trailingComma: "none" }
  },
  {
    rules: { "comma-dangle": [2, "always"] },
    options: { trailingComma: "es5" }
  },
  {
    rules: {
      "comma-dangle": [
        2,
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline"
        }
      ]
    },
    options: { trailingComma: "all" }
  },
  {
    rules: {
      "comma-dangle": [
        2,
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never-multiline"
        }
      ]
    },
    options: { trailingComma: "es5" }
  },
  {
    rules: {
      "comma-dangle": [
        2,
        {
          arrays: "never",
          objects: "never",
          imports: "never",
          exports: "never",
          functions: "never"
        }
      ]
    },
    options: { trailingComma: "none" }
  },
  {
    rules: { "max-len": ["error", { code: 120 }] },
    options: { printWidth: 120 }
  },
  { rules: { quotes: [2, "double"] }, options: { singleQuote: false } },
  { rules: { quotes: [2, "backtick"] }, options: { singleQuote: false } },
  {
    rules: {
      "comma-dangle": [
        2,
        {
          imports: "never",
          exports: "never"
        }
      ]
    },
    options: { trailingComma: "none" }
  },
  {
    rules: { "comma-dangle": [2, "always-multiline"] },
    options: { trailingComma: "es5" }
  },
  {
    rules: {},
    options: { jsxBracketSameLine: true },
    fallbackPrettierOptions: { jsxBracketSameLine: true }
  },
  {
    rules: { "react/jsx-closing-bracket-location": [2, "after-props"] },
    options: { jsxBracketSameLine: true }
  },
  {
    rules: { "react/jsx-closing-bracket-location": [2, "tag-aligned"] },
    options: { jsxBracketSameLine: false }
  },
  {
    rules: {
      "react/jsx-closing-bracket-location": [
        2,
        {
          nonEmpty: "after-props"
        }
      ]
    },
    options: { jsxBracketSameLine: true }
  },
  {
    rules: {
      "arrow-parens": [2, "always"]
    },
    options: { arrowParens: "always" }
  },
  {
    rules: {
      "arrow-parens": [2, "as-needed"]
    },
    options: { arrowParens: "avoid" }
  },

  // If an ESLint rule is disabled fall back to prettier defaults.
  { rules: { "max-len": [0, { code: 120 }] }, options: {} },
  { rules: { quotes: ["off", { code: 120 }] }, options: {} },
  { rules: { quotes: ["backtick", { code: 120 }] }, options: {} },
  { rules: { semi: "off" }, options: {} },
  { rules: { semi: ["off", "never"] }, options: {} },
  { rules: { semi: ["warn", "always"] }, options: {} },
  { rules: { semi: ["warn", "always"] }, options: { semi: true } },
  { rules: { semi: ["error", "never"] }, options: { semi: false } },
  { rules: { semi: [2, "never"] }, options: { semi: false } },
  { rules: { semi: [2, "never"] }, options: { semi: false } },
  { rules: { indent: "off" }, options: {} },
  { rules: { indent: ["off", "tab"] }, options: {} },
  { rules: { indent: ["warn", 2] }, options: { tabWidth: 2 } },
  { rules: { indent: ["warn", 4] }, options: { tabWidth: 4 } },
  { rules: { indent: ["error", "tab"] }, options: { useTabs: true } },
  { rules: { indent: [2, "tab"] }, options: { useTabs: true } },
  { rules: { "react/jsx-closing-bracket-location": [0] }, options: {} },
  { rules: { "arrow-parens": [0] }, options: {} }
];

getPrettierOptionsFromESLintRulesTests.forEach(
  ({ rules, options, prettierOptions, fallbackPrettierOptions }, index) => {
    test(`getPrettierOptionsFromESLintRulesTests ${index}`, () => {
      const { prettier } = getOptionsForFormatting(
        { rules },
        prettierOptions,
        fallbackPrettierOptions
      );
      expect(prettier).toMatchObject(options);
    });
  }
);

test("if prettierOptions are provided, those are preferred", () => {
  const { prettier } = getOptionsForFormatting(
    { rules: { quotes: [2, "single"] } },
    {
      singleQuote: false
    }
  );
  expect(prettier).toMatchObject({ singleQuote: false });
});

// eslint-disable-next-line max-len
test(`if fallbacks are provided, those are preferred over disabled eslint rules`, () => {
  const { prettier } = getOptionsForFormatting(
    {
      rules: {
        quotes: [0]
      }
    },
    {},
    {
      singleQuote: true
    }
  );
  expect(prettier).toMatchObject({ singleQuote: true });
});

test("if fallbacks are provided, those are used if not found in eslint", () => {
  const { prettier } = getOptionsForFormatting({ rules: {} }, undefined, {
    singleQuote: false
  });
  expect(prettier).toMatchObject({ singleQuote: false });
});

test("eslint max-len.tabWidth value should be used for tabWidth when tabs are used", () => {
  const { prettier } = getOptionsForFormatting({
    rules: {
      indent: ["error", "tab"],
      "max-len": [
        2,
        {
          tabWidth: 4
        }
      ]
    }
  });

  expect(prettier).toMatchObject({
    tabWidth: 4,
    useTabs: true
  });
});

test("eslint config has only necessary properties", () => {
  const { eslint } = getOptionsForFormatting({
    globals: { window: false },
    rules: { "no-with": "error", quotes: [2, "single"] }
  });
  expect(eslint).toMatchObject({
    fix: true,
    useEslintrc: false,
    rules: { quotes: [2, "single"] }
  });
});

test("useEslintrc is set to the given config value", () => {
  const { eslint } = getOptionsForFormatting({ useEslintrc: true, rules: {} });
  expect(eslint).toMatchObject({ fix: true, useEslintrc: true });
});
