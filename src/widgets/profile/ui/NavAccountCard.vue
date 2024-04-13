<template>
  <v-card min-width="300">
    <v-list>
      <v-list-item
        title="Петров Иван"
        subtitle="support@gmail.ru"
      >
        <template #append>
          <v-btn
            variant="text"
            icon="mdi-exit-to-app"
            title="Выйти"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
