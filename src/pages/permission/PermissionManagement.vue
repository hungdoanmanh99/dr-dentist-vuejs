<script setup lang="ts">
import { ref, computed, onMounted, Ref, reactive } from 'vue'
import { VaDataTable, VaSelect, useToast } from 'vuestic-ui'
import { usePermissionStore } from '@/stores/modules/permission.module'
import { useUserStore } from '@/stores/modules/user.module'

const { init } = useToast()
const store = usePermissionStore()
const userStore = useUserStore()
interface Permission {
  name: string
  Users: boolean
  DentalRecords: boolean
  Clinics: boolean
  Appointments: boolean
}
interface options {
  value: boolean
  label: string
}
const data: Ref<string[]> = ref([])
const columns = computed(() => [
  { key: 'name', label: 'Permission' },
  { key: 'Users', label: 'User' },
  { key: 'DentalRecords', label: 'Dental Record' },
  { key: 'Clinics', label: 'Clinic' },
  { key: 'Appointments', label: 'Appointment' },
])
const addPermissionByUSerID = async (action: string, resource: string) => {
  const id = userStore.id as string
  await store.AddPermissionByUserID(id, action, resource).then(() => {
    init({ message: store.message, color: 'success' })
  })
}
const deletePermissionByUSerID = async (action: string, resource: string) => {
  const id = userStore.id as string
  await store.DeletePermissionByUserID(id, action, resource).then(() => {
    init({ message: store.message, color: 'success' })
  })
}
const getPermissionByUser = async () => {
  const id = userStore.id as string
  const res = await store.GetPermissionByUserID(id)
  console.log('res', res)
  data.value = res
  console.log('array - permission', permissions[0]['name'])
  data.value.forEach((item) => {
    const items = item.split('.') as string[]
    if (items[2] === 'View') {
      if (items[1] === 'Users') {
        permissions[0]['Users'] = true
      } else if (items[1] === 'DentalRecords') {
        permissions[0]['DentalRecords'] = true
      } else if (items[1] === 'Clinics') {
        permissions[0]['Clinics'] = true
      } else if (items[1] === 'Appointments') {
        permissions[0]['Appointments'] = true
      }
    } else if (items[2] === 'Create') {
      if (items[1] === 'Users') {
        permissions[0]['Users'] = true
      } else if (items[1] === 'DentalRecords') {
        permissions[0]['DentalRecords'] = true
      } else if (items[1] === 'Clinics') {
        permissions[0]['Clinics'] = true
      } else if (items[1] === 'Appointments') {
        permissions[0]['Appointments'] = true
      }
    } else if (items[2] === 'Update') {
      if (items[1] === 'Users') {
        permissions[0]['Users'] = true
      } else if (items[1] === 'DentalRecords') {
        permissions[0]['DentalRecords'] = true
      } else if (items[1] === 'Clinics') {
        permissions[0]['Clinics'] = true
      } else if (items[1] === 'Appointments') {
        permissions[0]['Appointments'] = true
      }
    } else if (items[2] === 'Delete') {
      if (items[1] === 'Users') {
        permissions[0]['Users'] = true
      } else if (items[1] === 'DentalRecords') {
        permissions[0]['DentalRecords'] = true
      } else if (items[1] === 'Clinics') {
        permissions[0]['Clinics'] = true
      } else if (items[1] === 'Appointments') {
        permissions[0]['Appointments'] = true
      }
    }
  })
}
const booleanOptions = reactive<options[]>([
  { value: true, label: 'true' },
  { value: false, label: 'false' },
])
const onChange = (column: string, row: string, newValue: boolean) => {
  console.log('Column:', column)
  console.log('Row:', row)
  console.log('New value:', newValue)
  const permissionToUpdate = permissions.find((permission) => permission.name === row) as Permission
  console.log('permissionToUpdate[column as keyof Permission]', permissionToUpdate[column as keyof Permission])
  if (permissionToUpdate[column as keyof Permission] !== newValue) {
    if (newValue === true) {
      addPermissionByUSerID(row, column)
    } else {
      deletePermissionByUSerID(row, column)
    }
    getPermissionByUser()
  }
}
const permissions = reactive<Permission[]>([
  { name: 'View', Users: false, DentalRecords: false, Clinics: false, Appointments: false },
  { name: 'Create', Users: false, DentalRecords: false, Clinics: false, Appointments: false },
  { name: 'Update', Users: false, DentalRecords: false, Clinics: false, Appointments: false },
  { name: 'Delete', Users: false, DentalRecords: false, Clinics: false, Appointments: false },
])

onMounted(() => {
  getPermissionByUser()
})
</script>

<template>
  <div>
    <VaDataTable
      class="my-table va-table--hoverable"
      :items="permissions"
      :columns="columns"
      hoverable
      :disable-client-side-sorting="false"
      :style="{
        '--va-data-table-thead-background': 'var(--va-background-element)',
        '--va-data-table-grid-tr-border': '1px solid var(--va-background-border)',
      }"
      sticky-header
      no-data-html="<div class='text-center'>No data found</div>"
    >
      <template #cell(name)="{ value }">
        <strong>{{ value }}</strong>
      </template>
      <template #cell(Users)="{ row, column }">
        <VaSelect
          v-model="row.rowData[column.key]"
          :options="booleanOptions"
          track-by="value"
          text-by="label"
          @update:modelValue="(newValue) => onChange(column.key, row.rowData.name, newValue.value)"
        />
      </template>
      <template #cell(DentalRecords)="{ row, column }">
        <VaSelect
          v-model="row.rowData[column.key]"
          :options="booleanOptions"
          track-by="value"
          text-by="label"
          @update:modelValue="(newValue) => onChange(column.key, row.rowData.name, newValue.value)"
        />
      </template>
      <template #cell(Clinics)="{ row, column }">
        <VaSelect
          v-model="row.rowData[column.key]"
          :options="booleanOptions"
          track-by="value"
          text-by="label"
          @update:modelValue="(newValue) => onChange(column.key, row.rowData.name, newValue.value)"
        />
      </template>
      <template #cell(Appointments)="{ row, column }">
        <VaSelect
          v-model="row.rowData[column.key]"
          :options="booleanOptions"
          track-by="value"
          text-by="label"
          @update:modelValue="(newValue) => onChange(column.key, row.rowData.name, newValue.value)"
        />
      </template>
    </VaDataTable>
  </div>
</template>
