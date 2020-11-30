import { MenuItem,Container,Header,Aside,Main,Input,Footer,Avatar, Menu, Table, TableColumn, Pagination ,Button} from "element-ui";

export default {
  install : (Vue) => {
    for(let co of [MenuItem,Container,Header,Aside,Main,Input,Footer,Avatar, Menu, Table, TableColumn, Pagination ,Button]){
      Vue.use(co)
    }
  }
}
