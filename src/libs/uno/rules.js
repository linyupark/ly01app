export default [
  [
    // 有指定方向的安全区
    /^safe-area-padding-(top|bottom|left|right|all)$/,
    ([, side]) =>
      side === "all"
        ? {
            padding:
              "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
          }
        : {
            [`padding-${side}`]: `env(safe-area-inset-${side})`,
          },
  ],
];
