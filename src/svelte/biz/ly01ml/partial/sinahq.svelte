<!-- 新浪行情 -->
<script>
  const storeCodeName = "_ly01_biz_sinahq_";
  // 代码列表
  let codeList = JSON.parse(localStorage.getItem(storeCodeName) ?? "[]");
  // 代码输入
  let codeVal = ''
</script>

<div class="block" flex flex-wrap bg-white bg-op-80>
  <h3 bg-rose-6 bg-op-80 rounded text-white p-1 text-center w-10>韭场</h3>
  <input bind:value={codeVal} placeholder="sh|sz|hk***" />
</div>
