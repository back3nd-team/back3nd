<script setup lang="ts">
const page = ref()
page.value = {
  title: 'Welcome to NuxtLand',
  description: 'Discover the best practices and tools for building Nuxt applications.',
  hero: {
    title: 'Unlock the Power of Nuxt',
    description: 'Effortlessly build high-performance web apps with the most popular Vue framework.',
    links: [
      { label: 'Get Started', url: '/get-started' },
      { label: 'Documentation', url: '/docs' },
    ],
    headline: {
      label: 'New Release',
      to: '/release-notes',
      icon: 'new-release',
    },
  },
  sections: [
    {
      title: 'Powerful Tools',
      description: 'Nuxt offers a suite of powerful tools to help you build modern web apps.',
      align: 'left',
      features: [
        { title: 'Server-side Rendering', description: 'Build fast and SEO-friendly applications.' },
        { title: 'Static Site Generation', description: 'Create static websites with ease.' },
      ],
    },
    {
      title: 'Easy Integration',
      description: 'Integrate with your favorite tools and services seamlessly.',
      align: 'right',
      features: [
        { title: 'Vue 3', description: 'Leverage the latest Vue.js ecosystem.' },
        { title: 'Tailwind CSS', description: 'Stylize your app with modern utility-first CSS.' },
      ],
    },
  ],
  features: {
    title: 'Core Features',
    description: 'Nuxt provides essential features to supercharge your development.',
    items: [
      { title: 'Auto Importing', description: 'Automatically import components and composables.' },
      { title: 'TypeScript Support', description: 'Enjoy built-in TypeScript integration for better tooling.' },
      { title: 'Modular Architecture', description: 'Organize your project into reusable modules.' },
    ],
  },
  testimonials: {
    headline: 'What Developers Say',
    title: 'Loved by the Developer Community',
    description: 'Hear from developers who have built incredible projects with Nuxt.',
    items: [
      {
        name: 'John Doe',
        role: 'Frontend Engineer',
        quote: 'Nuxt made it incredibly easy to build and deploy my app!',
        avatar: '/images/john-doe.jpg',
      },
      {
        name: 'Jane Smith',
        role: 'Full-stack Developer',
        quote: 'The best framework for Vue applications, hands down!',
        avatar: '/images/jane-smith.jpg',
      },
    ],
  },
  cta: {
    title: 'Join the Community',
    description: 'Get involved with the vibrant Nuxt community and start building today.',
    button: {
      label: 'Join Now',
      url: '/community',
    },
  },
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>

<template>
  <ULandingHero
    :title="page.hero.title"
    :description="page.hero.description"
    :links="page.hero.links"
  >
    <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

    <template #headline>
      <UBadge
        v-if="page.hero.headline"
        variant="subtle"
        size="lg"
        class="relative rounded-full font-semibold"
      >
        <NuxtLink
          :to="page.hero.headline.to"
          target="_blank"
          class="focus:outline-none"
          tabindex="-1"
        >
          <span
            class="absolute inset-0"
            aria-hidden="true"
          />
        </NuxtLink>

        {{ page.hero.headline.label }}

        <UIcon
          v-if="page.hero.headline.icon"
          :name="page.hero.headline.icon"
          class="ml-1 w-4 h-4 pointer-events-none"
        />
      </UBadge>
    </template>
  </ULandingHero>

  <ULandingSection class="!pt-0">
    <ImagePlaceholder />
  </ULandingSection>

  <ULandingSection
    v-for="(section, index) in page.sections"
    :key="index"
    :title="section.title"
    :description="section.description"
    :align="section.align"
    :features="section.features"
  >
    <ImagePlaceholder />
  </ULandingSection>

  <ULandingSection
    :title="page.features.title"
    :description="page.features.description"
  >
    <UPageGrid>
      <ULandingCard
        v-for="(item, index) in page.features.items"
        :key="index"
        v-bind="item"
      />
    </UPageGrid>
  </ULandingSection>

  <ULandingSection
    :headline="page.testimonials.headline"
    :title="page.testimonials.title"
    :description="page.testimonials.description"
  >
    <UPageColumns class="xl:columns-4">
      <div
        v-for="(testimonial, index) in page.testimonials.items"
        :key="index"
        class="break-inside-avoid"
      >
        <ULandingTestimonial
          v-bind="testimonial"
          class="bg-gray-100/50 dark:bg-gray-800/50"
        />
      </div>
    </UPageColumns>
  </ULandingSection>

  <ULandingSection>
    <ULandingCTA
      v-bind="page.cta"
      class="bg-gray-100/50 dark:bg-gray-800/50"
    />
  </ULandingSection>
  TESTE 333
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
