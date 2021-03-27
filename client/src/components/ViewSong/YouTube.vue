<template>
  <panel title="YouTube Video">
    <youtube
      :video-id="youtubeId"
      :player-widht="0"
      :player-height="160">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>
