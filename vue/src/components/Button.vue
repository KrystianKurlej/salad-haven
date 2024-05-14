<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'button-component',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: value => ['large', 'medium', 'small'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'danger', 'stroke', 'link'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        `btn-${this.size}`,
        `btn-${this.variant}`,
        { 'btn-disabled': this.disabled } // Dodajemy klasę 'btn-disabled', jeśli przycisk jest wyłączony
      ];
    }
  }
}
</script>