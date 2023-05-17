<script>
  let value = "";
</script>

<input
  id="search"
  type="search"
  placeholder="关键字"
  bg-white
  rounded
  text-4
  p-1
  w-100
  m-b-1
  bind:value
/>
<a
  href={`https://www.google.com/search?q=${encodeURIComponent(value)}`}
  target="_blank">谷歌</a
>
<a
  href={`https://www.bing.com/search?q=${encodeURIComponent(value)}`}
  target="_blank">必应</a
>
<a
  href={`https://github.com/search?q=${encodeURIComponent(
    value
  )}&type=repositories`}
  target="_blank">Github</a
>
<a
  href={`https://zhaoziyuan.la/so?filename=${encodeURIComponent(value)}`}
  target="_blank">阿里云盘</a
>
<a href={`https://xxxxx525.com/?s=${encodeURIComponent(value)}`} target="_blank"
  >游戏</a
>
<a
  href={`https://icones.js.org/collection/ion?s=${encodeURIComponent(value)}`}
  target="_blank">图标</a
>
<a
  href={`https://you.com/search?q=${encodeURIComponent(
    value
  )}&fromSearchBar=true&tbm=youchat`}
  target="_blank">AI对话</a
>
<a
  href={`https://unocss.dev/interactive/?s=${encodeURIComponent(value)}`}
  target="_blank">UnoCSS</a
>

<style lang="scss">
  a {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #fff;
    margin-left: 5px;
    color: #666;
    font-size: 16px;
    transition: all 0.2s;
    &:hover {
      color: #444;
      border-color: #444;
    }
  }
</style>
