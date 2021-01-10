<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit
            :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {

  data: () => ({
    categories: [],
    loading:true,
    updateCount:0,
  }),
 async mounted() {
     this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
   console.log(this.categories);
  },
  methods: {
    updateCategories(category){
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
    addNewCategory(category) {
      this.categories.push(category);

    }
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  }
}
</script>