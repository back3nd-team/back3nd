<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'

interface DataPoint {
  fornecedor: string
  valorTotal: number
}

// Props recebidas
defineProps<{
  data: DataPoint[]
}>()

let chartInstance: echarts.ECharts | null = null

function renderPieChart() {
  const chartDom = document.getElementById('pie-chart')
  if (!chartDom)
    return

  if (!chartInstance) {
    chartInstance = echarts.init(chartDom)
  }

  const option = {
    title: {
      text: 'Distribuição por Fornecedor',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.map(item => item.fornecedor),
    },
    series: [
      {
        name: 'Valor Total',
        type: 'pie',
        radius: '50%',
        data: data.map(item => ({
          name: item.fornecedor,
          value: item.valorTotal,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  chartInstance.setOption(option)
}

watch(
  () => data,
  () => {
    renderPieChart()
  },
  { deep: true },
)

onMounted(renderPieChart)
</script>

<template>
  <div id="pie-chart" style="width: 100%; height: 400px;" />
</template>
