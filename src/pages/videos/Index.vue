<template>
  <div class="q-pa-md q-gutter-sm">
  <q-chip size="25px" icon="bookmark">
  Videos
  </q-chip>
  <iframe width="1204" height="659" src="https://www.youtube.com/embed/FxO1poo8f2I"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
    <iframe width="800" height="450" src="https://www.youtube.com/embed/JaAWdljhD5o?list=RDJaAWdljhD5o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe width="500" height="250" src="https://www.youtube.com/embed/wDjeBNv6ip0?list=RDJaAWdljhD5o" frameborder="50" allow="accelerometer; ; encrypted-media; gyroscope;" allowfullscreen></iframe>
    <q-video
      :ratio="16/9"
      src="https://www.youtube.com/watch?v=C2mh_pMIHQU"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      poster: 'statics/media/TearsOfSteel/TearsOfSteel.jpeg',
      sources: [
        {
          src: 'https://www.youtube.com/watch?v=FxO1poo8f2I',
          type: 'video/mp4'
        }
      ]
    }
  }
}
</script>
