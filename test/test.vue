<template>
  <div>
    <p class='array-message'>{{$i18n([{content: 'helloWorld', params: ['hello']}, {content: 'helloWorld', params: ['hello']}], true)}}</p>
    <p class='message'>{{$i18n({content: 'helloWorld', params: ['hello']}, true)}}</p>
    <p class='nodata'>{{$i18n('nodata')}}</p>
    <p class='hello'>{{$i18n('hello')}}</p>
    <p class='number'>{{$i18n(1024)}}</p>
    <p class='hello-world'>{{$i18n(['hello', 'world'])}}</p>
    <p class='world'>{{$i18n({content: 'helloWorld', params: ['hello']})}}</p>
    <p class='content-nodata'>{{$i18n({content: 'nodata'})}}</p>
    <p class='param-nodata'>{{$i18n({content: 'helloWorld', params: ['nodata']})}}</p>
    <p class='array-nodata'>{{$i18n(['nodata', 'nodata'])}}</p>    
  </div>
</template>

<script>
export default {
  name: 'testTest'
}
</script>
