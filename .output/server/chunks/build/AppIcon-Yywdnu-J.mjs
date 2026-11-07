globalThis.__timing__.logStart('Load chunks/build/AppIcon-Yywdnu-J');import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppIcon",
  __ssrInlineRender: true,
  props: {
    name: {}
  },
  setup(__props) {
    const paths = {
      search: ["m21 21-4.5-4.5", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"],
      cart: ["M3 3h2l2.4 12h11.2l2-8H6", "M10 20h.01M18 20h.01"],
      menu: ["M4 6h16M4 12h16M4 18h16"],
      close: ["m6 6 12 12M6 18 18 6"],
      bolt: ["m13 2-9 12h7l-1 8 10-12h-8l1-8Z"],
      "chevron-down": ["m6 9 6 6 6-6"],
      "arrow-right": ["M4 12h16m-6-6 6 6-6 6"],
      "arrow-up-right": ["M6 18 18 6M6 6h12v12"],
      headphones: ["M4 14v-3a8 8 0 0 1 16 0v3", "M4 12H3v8h4v-8H4Zm16 0h1v8h-4v-8h3Z"],
      sparkles: ["m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"],
      devices: ["M3 4h13v12H3zM7 20h5M9.5 16v4M18 9h4v11h-4z"],
      shield: ["m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z", "m8 12 3 3 5-6"],
      truck: ["M2 5h12v12H2zM14 9h4l4 4v4h-8", "M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"],
      returns: ["M4 10a8 8 0 1 1 1 8M4 4v6h6", "M10 8h6v8h-6z"],
      support: ["M4 14v-3a8 8 0 0 1 16 0v3M4 12H3v7h4v-7H4Zm16 0h1v7h-4v-7h3ZM20 19c0 2-3 3-6 3"]
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, _attrs))}><!--[-->`);
      ssrRenderList(paths[__props.name], (path) => {
        _push(`<path${ssrRenderAttr("d", path)}></path>`);
      });
      _push(`<!--]--></svg>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/AppIcon-Yywdnu-J');
//# sourceMappingURL=AppIcon-Yywdnu-J.mjs.map
