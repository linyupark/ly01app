<!-- 新浪行情 -->
<script>
  import { onDestroy, onMount } from "svelte";

  let timer;
  let hqTimer;

  const storeCodeName = "_ly01_biz_sinahq_";
  // 代码列表
  let codeList = JSON.parse(localStorage.getItem(storeCodeName) ?? "[]");
  // 查询状态
  let searchLoading = false;
  // 代码输入
  let codeVal = "";
  // 查询结果
  let searchRes = [];
  // 行情结果
  let hqRes = {};

  // 行情接口
  const sinaHQ = async () => {
    try {
      const res = await fetch("/api/sinahq", {
        method: "POST",
        body: JSON.stringify({ code: codeList }),
      });
      const r = await res.json();
      // console.log({ r })
      if (r.result) {
        hqRes = { ...r.result };
      }
    } catch {
      hqRes = {};
    }
  };

  // 查询接口
  const sinaSG = async (code) => {
    searchLoading = true;
    try {
      const res = await fetch("/api/sinasg", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const r = await res.json();
      if (r.result) {
        searchRes = r.result;
      }
    } finally {
      searchLoading = false;
    }
  };

  // 添加
  const addItem = async (item) => {
    // console.log(item);
    const selectCode = item.split(" · ")[1];
    if (codeList.indexOf(selectCode) !== -1) return;
    codeList.unshift(selectCode);
    localStorage.setItem(storeCodeName, JSON.stringify(codeList));
  };

  // 删除
  const rm = async (code) => {
    const ix = codeList.indexOf(code);
    if (ix === -1) return;
    codeList.splice(ix, 1);
    localStorage.setItem(storeCodeName, JSON.stringify(codeList));
    delete hqRes[code];
  };

  const debounce = (v) => {
    if (v === "" || !v) {
      codeVal = "";
      searchLoading = false;
      searchRes = [];
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      codeVal = v;
    }, 750);
  };

  $: if (codeVal !== "") {
    sinaSG(codeVal);
  }

  onMount(() => {
    if (codeList.length > 0) {
      sinaHQ();
    }
    hqTimer = setInterval(() => {
      if (codeList.length > 0) {
        sinaHQ();
      }
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(hqTimer);
  });
</script>

<div class="relative text-left">
  <input
    type="search"
    bg-white
    rounded
    text-4
    p-1
    w-50
    m-b-1
    ml-2
    on:input={({ target: { value } }) => debounce(value)}
    placeholder="韭菜代码"
  />
  <div
    in:slide={searchLoading || searchRes.length > 0}
    class="absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg search-r"
  >
    {#if searchLoading}
      <div text-center p-1><i i-ion-load-c animate-spin /></div>
    {/if}
    {#if searchRes.length > 0}
      {#each searchRes as item}
        <button
          block
          text-gray-700
          px-4
          py-2
          text-sm
          cursor-pointer
          class="hover:bg-gray-100 hover:text-gray-900"
          on:click={addItem(item)}
        >
          {item}
        </button>
      {/each}
    {/if}
  </div>
</div>

{#each Object.keys(hqRes) as code}
  <a
    class="stk"
    href={`https://xueqiu.com/S/${hqRes[code]?.fcode?.toUpperCase()}`}
    target="_blank"
  >
    {hqRes[code]?.name ?? "--"}
    <span class="current">{hqRes[code]?.current ?? "--"}</span>
    <span class="updown">{hqRes[code]?.updown ?? "--"}</span>
  </a>
  <button on:click={rm(code)}><i class="i-ion-trash-bin-outline text-3" /></button>
{/each}

<style lang="scss">
  .search-r {
    max-height: 200px;
    overflow-y: auto;
  }
  a.stk {
    border-bottom: 1px dotted #999;
    margin-left: 15px;
    display: inline-flex;
    align-items: center;
    transition: all 0.2s;
    font-size: 12px;
    &:hover {
      color: rgb(199, 84, 12);
      transform: translateY(1px);
      border: none;
    }
    span {
      margin-left: 5px;
      width: 50px;
    }
    .current {
      width: 60px;
    }
  }
</style>
