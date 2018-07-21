import Category from './Category';

/* istanbul ignore next */
Category.install = function(Vue) {
  Vue.component(Category.name, Category);
};

export default Category;
