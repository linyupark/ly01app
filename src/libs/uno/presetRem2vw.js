// const remRE = /(-?[\.\d]+)rem/g
const pxRE = /(-?[\.\d]+)px/g;

function remToVwPreset(options = {}) {
  const { baseFontSize = 16, baseWidth = 375, unitPrecision = 4 } = options;

  const pxToVw = (px) => ((100 / baseWidth) * px).toFixed(unitPrecision);

  return {
    name: "preset-rem-to-vw",
    postprocess: (util) => {
      util.entries.forEach((i) => {
        // console.log({ i })
        const value = i[1];
        if (value && typeof value === "string")
          if (pxRE.test(value))
            // if (remRE.test(value))
            //   i[1] = value.replace(
            //     remRE,
            //     (_, p1) => `${pxToVw(p1 * baseFontSize)}vw`
            //   )
            i[1] = value.replace(pxRE, (_, p1) =>
              p1 <= 1 ? `${p1}px` : `${pxToVw(p1)}vw`
            );
      });
    },
  };
}

export default remToVwPreset;
