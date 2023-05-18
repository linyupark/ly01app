import iconv from "iconv-lite";
import currency from "currency.js";

export async function post({ request }) {
  const data = await request.json();
  const codeList = data?.code ?? [];
  const codeListFormated = codeList.map((c) => {
    if (c === "hstech") {
      return "hkHSTECH";
    }
    if (/^of\d+$/.test(c)) {
      // 基金
      return (c[2] == 1 ? "sz" : "sh") + c.replace("of", "");
    }
    if (/^(cf|au|sp|sr|sc)+\d+$/.test(c)) {
      // 期货
      return `nf_${c.toUpperCase()}`;
    }
    return c;
  });

  const codeResultMap = {};

  const res = await fetch(
    `http://hq.sinajs.cn/list=${codeListFormated.join(",")}`,
    {
      headers: {
        Referer: "http://vip.stock.finance.sina.com.cn/",
      },
    }
  );

  try {
    let arrBuf = await res.arrayBuffer();
    let buf = Buffer.from(arrBuf);
    let str = iconv.decode(buf, "GBK");

    // 数据整理
    codeList.map((code, i) => {
      const reg = new RegExp(`var hq_str_${codeListFormated[i]}="([^"]+)`);
      const regName = new RegExp(
        `${codeListFormated[i].replace("hk", "")},`,
        "i"
      );
      const regRes = str.match(reg)[1].replace(regName, "").split(",");
      // 名字
      const name = regRes?.[0] ?? "--";
      // 今开
      const todayOpen = regRes?.[1] ?? "--";
      // 昨收
      const ydayClose =
        regRes?.[/^(cf|au|sp|sr|sc)+\d+$/.test(code) ? 10 : 2] ?? "--";
      // 现价
      const current =
        regRes?.[/^(cf|au|sp|sr|sc)+\d+$/.test(code) ? 7 : 3] ?? "--";
      // 差额
      const offset =
        ydayClose === "--"
          ? 0
          : currency(current, { precision: 4, symbol: "" }).subtract(
              Number(ydayClose)
            );
      // 涨跌幅
      const updown = currency(offset, { precision: 4, symbol: "" })
        .divide(ydayClose)
        .multiply(100);

      codeResultMap[code] = {
        name,
        todayOpen,
        ydayClose,
        current,
        offset: offset.format().slice(0, -2),
        updown: `${updown.format().slice(0, -2)}%`,
        fcode: codeListFormated[i],
      };
    });

    return new Response(
      JSON.stringify({
        result: codeResultMap,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        result: false,
      }),
      {
        status: 200,
      }
    );
  }
}
