
<!-- PRRe -->

<template>
  <q-page class="flex">
    <header class="masthead d-flex">
        <div class="container text-center my-auto">
            <h4 class="mb-1">* Bienvenido a Delicius Garden *</h4>
            <h5 class="mb-5">
                <em>Store your favorite Website's Links!</em>
            </h5>
            <a class="btn btn-primary btn-lg" href="/login">
                Let's get started
            </a>
        </div>
        <div class="overlay"></div>
    </header>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue'
import { Todo, Meta } from 'components/models'

export default {
  name: 'PageIndex',
  components: { ExampleComponent },
  data () {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]
    const meta: Meta = {
      totalCount: 1200
    }
    return { todos, meta }
  }
}
</script>
