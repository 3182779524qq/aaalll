import Vue, {VNodeDirective} from "vue";

/**
 * 表单输入剔除空格
 */
Vue.directive("input-exclude-space", {
    bind () {},
    inserted (el, binding) {
        el.onkeyup = () => {
            el.value = el.value.replace(/ /g, "");
        }

        el.onblur = () => {
            el.value = el.value.replace(/ /g, "");
        }
    },
    update () {},
    componentUpdated () {},
    unbind () {}
})

/**
 * 多行文本溢出
 */
Vue.directive("multline-ellipsis", {
    bind () {},
    inserted (el, binding) {
        let styles = getComputedStyle(el),
            fontSize = 0;
        if(styles && styles.fontSize){
            fontSize = parseFloat(styles.fontSize);
        }
        //显示文本行数
        let rows = binding.value ? binding.value : 1;
        let width = el && el.offsetWidth;
        //允许显示的字数
        let fonts = (width / fontSize) * rows - 1;
        let context = el.innerHTML.replace(/\s+|\t|\r|\n/g, "");
        if(context.length > fonts){
            let beShowFonts = context.substring(0, fonts) + "...";
            //设置显示文本
            el.innerHTML = beShowFonts;
        }
    },
    update () {},
    componentUpdated () {},
    unbind () {

    }
})


/**
 * 输入限制数字
 */
Vue.directive("input-number", {
    bind () {},
    inserted (el, binding) {

        let formatVal = (e)=>{
            e && e.stopPropagation();
            let result = el.value.match(/\d/g);
            el.value = result ? result.join("") : "";
        }

        el.onkeyup = formatVal;
        el.onkeydown = formatVal;
        el.onchange = formatVal;
    },
    update () {},
    componentUpdated () {},
    unbind () {
    }
})


//el-dialog 拖拽
Vue.directive("el-dialog-drag", {
    bind () {},
    inserted (el, binding) {
       //console.log(el);
       // console.log(el.document.getElementsByClassName("el-dialog__header"));
        let mouseHasDown = false;
        el.onmousedown = (e) => {
            //console.log(e.target.className)
            //console.log(e.target.className.includes("el-dialog__header"))

            if(e.target.className.includes("el-dialog__header")){
                mouseHasDown = true;
            }
        }

        el.onmousemove = (e) => {

        }

    },
    update () {},
    componentUpdated () {},
    unbind (el, binding) {
        el.removeEventListener('mousedown' , null)
    }
})