<template>
  <div
    class="mt-1 h-32 sm:h-40 border rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden"
    :class="square ? 'w-32 sm:w-40' : 'w-full'"
  >
    <img
      :src="src"
      class="h-32 sm:h-40 object-contain"
      :class="square ? 'w-32 sm:w-40' : 'w-full'"
    />
  </div>
</template>

<script>
export default {
  props: {
    square: { type: Boolean, default: true },
    src: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXd3d2ampqXl5e9vb3g4ODS0tKUlJTPz8+/v7/W1tavr6/IyMinp6fFxcWsrKyfn5+3t7dEyn0RAAADn0lEQVR4nO2c65qqMAwApYYKKovv/7RH96xQoBV0S2878xuJ8wEhKW0PBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBNSGhC69XdMSxdHVJSul6r0Oi+C6YoX7qKgf4KpChfKopgVakwitLFuYIPdJAbVfpoglXVhzCs413C+0Ws9xeULtZT+EAFuE2lMQwDvSiMgMcAhschoOoDve17FcdQ3YJVbDcVxTBIXvsJ2scwDBFsCHoLGDSOYcigGOYfFMNfnt3ezJdiKFJfmuZiaebLMJTT+acKrM6n2alLMJT2qsfaTF/byckLMLx3LJOWRU2biPwNpVk0nboxTp+9oXVgxByxyN6wtTbVqt01qJMdgsnVbngdAuRueHKM/OjTjkHd+A8mZ8fIjzo/I+RuaPd7UIhh7Ry8U8+xw7wN5eI2vMhOQV/+Ie+GjduwwXAPuEvfp/hM8wfeFuW/8cuv2v5A5Z1597Rluk/OHbAcjr3W17Uvt/mOYkhdfR+tr2sH5joSNTxgRtZwnDbT0cRxYsr6ZJ8cR4Qnb4Hx9e0+PrdR/Vmtom5bMlNOX2YW+VFvUfxlUB9sDSbLWmzyAtglqBe2BrPVKR9PvEvScOn3ULx89gcTNHQU05Wavwd8BvXEpmDjJKaFYvvJX0zO0FJmjrTWX6zk5cQMLWnUxPaD4+3lE5qaob3dG+7Tfn7Gw70kVS+L89QMV6ZJz6rwZ/+xMH8vqD9Wg7nSqENxHC590X8kZehOo4biWIXLcXxm3YopGW5bqzAoytk83NliJWQop/Ur+KMo3zlmerir/0jI8HUaNV36rq5van64o/9IyPCN1SbTSfiDov3eT8XQx4ooa/+RiuGWNLpB0VLdJGLoa8mXXvYfaRiK+zvgmyxbrDQM7T3vZ4rzFisNQ6+L9tqNQQMael5Y2m8KGtLQWO/lhVmjEd9QLr6XXU6r8OiG/tKoQzG6occ0aigajUZsw/We9zNFs4uMauicLfJrxaHRiGtodume0UnMa/OfRk3FTqxBQxrK5p73M8X/jUbUa7inX/VsNCIa7pRGDVQtMQ13S6Om4r3RiGb48guMP9p4hnumUZNYhs2+aXRE9cNc8MDXMNhGNeoaxbAKdAUnscIaxgBDDDHEEEMMMcQQQwwxLMaw+L0vy9+/9A/sQVv+PsLl7wV9KH8/70P5e7Ifyt9X/79kYMLqAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQL78AzYYQhHIq/FbAAAAAElFTkSuQmCC',
    },
  },
}
</script>

<style></style>
