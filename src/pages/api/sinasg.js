import iconv from "iconv-lite";
import currency from "currency.js";

export async function post({ request }) {
  const data = await request.json();
  const code = data?.code ?? '';
  const ts = Date.now();
  const varName = `suggestdata_${ts}`;
  let result = [];

  const res = await fetch(
    `http://suggest3.sinajs.cn/suggest/type=&key=${encodeURIComponent(
      code
    )}&name=${varName}`,
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
    if (str !== "") {
      let matchList =
        str.match(
          /((sh|sz|hk|hstech|au|cf|sp|sr|sc|of)\d{0,}\,[\u4e00-\u9fa5-A-Z]+)/gi
        ) ?? [];
      matchList = matchList.map((opt) => {
        return opt.split(",").reverse().join(" · ");
      });
      result = matchList;
    }

    return new Response(
      JSON.stringify({
        result,
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
