<template>
  <div
    class="bone-input-text"
    :class="{
      'bone-input-text-filled': focus || filled || autofilled,
      'bone-input-touched': touched,
      'bone-input-invalid': !isValid,
    }"
  >
    <div class="bone-input-text-inner">
      <input
        class="bone-input-text-input"
        :id="'bone-text-'+name+'-'+inst"
        :type="innerType"
        :name="name"
        ref="inputEl"
        :value="innerValue"
        :required="required"
        :disabled="disabled"
        v-on:input="onChangeValue"
        :autocomplete="autocomplete"
        v-on:animationstart="checkAnimation"
        v-on:focus="onFocus($event)"
        v-on:blur="onBlur($event)"
      >
      <label
        class="bone-input-text-label"
        :for="'bone-text-'+name+'-'+inst"
      >
        <slot></slot>
      </label>
    </div>
    <div
      v-if="innerInstruction"
      class="bone-instruction"
      v-html="innerInstruction"
    ></div>
    <div
      v-if="innerError"
      class="bone-error"
      v-html="innerError"
    ></div>
  </div>
</template>


<style lang="scss">
.bone-input-text {
  position: relative;
  // active state where the placeholder (label) is translated up
  &.bone-input-text-filled .bone-input-text-label,
  .bone-input-text-input:focus ~ .bone-input-text-label,
  .bone-input-text-input[type="date"] ~ .bone-input-text-label {
    transform: translateY(-175%);
    font-size: 10px;
  }
  .bone-input-text-input:focus {
    outline: none;
  }

  .bone-instruction,
  .bone-error {
    padding: 0.5rem;
  }

  .bone-error {
    color: red;
  }
}

.bone-input-text-inner {
  position: relative;
}

.bone-input-text-input {
  height: 52px;
  width: 100%;
  padding: 0 0.5rem;
  font-size: 14px;

  &:-webkit-autofill {
    animation-name: onAutoFillStart;
  }
  &:not(:-webkit-autofill) {
    animation-name: onAutoFillCancel;
  }

  &:disabled {
    & ~ .bone-input-text-label {
      color: lightgray;
    }
  }
}

.bone-input-text-label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0 0.5rem;
  font-size: 14px;
  font-weight: inherit;
  font-family: inherit;
  line-height: 1.25em;
  pointer-events: none;
  transition: transform 0.2s, font-size 0.2s;
}

@keyframes onAutoFillStart {
  from {
  }
  to {
  }
}
@keyframes onAutoFillCancel {
  from {
  }
  to {
  }
}
</style>


<script lang="ts">
import Vue from "vue";

let inst = 0;

export default Vue.extend({
  name: "BoneInputText",
  props: [
    "name",
    "type",
    "initvalue",
    "value",
    "required",
    "disabled",
    "autocomplete",
    "instruction",
    "error",
    "validator",
  ],
  data() {
    return {
      inst: inst,
      focus: false,
      touched: false,
      filled: false,
      autofilled: false,
      isValid: true,
      innerType: "type" in this ? this.type : "text",
      innerValue: this.value || this.initvalue || "",
      innerInstruction: this.instruction || "",
      innerError: this.error || "",
    };
  },
  methods: {
    onChangeValue(e: Event) {
      this.innerValue = this.$refs.inputEl.value;
      this.filled = Boolean(this.innerValue);
      this.$emit("input", this.innerValue);
    },
    checkAnimation(e: AnimationEvent) {
      if (e.animationName == "onAutoFillStart") {
        this.autofilled = true;
      } else if (e.animationName == "onAutoFillCancel") {
        this.autofilled = false;
      }
    },
    onFocus(e: Event) {
      if (!this.touched) {
        this.touched = true;
      }
    },
    onBlur(e: Event) {
      if (typeof this.required === "undefined") {
        this.isValid = true;
      } else {
        if ("validator" in this && typeof this.validator === "function") {
          try {
            this.isValid = this.validator(this.innerValue, this);
          } catch (ex) {
            console.warn(ex);
            // Fallback validator: Non-empty
            this.isValid = Boolean(this.innerValue);
          }
          console.log("onBlur, validator", this.isValid);
        } else {
          // just check for emptiness
          this.isValid = Boolean(this.innerValue);
        }
      }
    },
  },
  created() {
    ++inst;
  },
  mounted() {
    if (this.innerValue) {
      this.filled = true;
    }
  },
  watch: {
    value(val: string) {
      this.innerValue = val;
    },
  },
});
</script>