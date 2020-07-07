import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Pagination,
  Dialog,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  Icon,
  Option,
  OptionGroup,
  Upload,
  Card,
  Divider,
  Image,
  Loading,
  Message
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Image)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
