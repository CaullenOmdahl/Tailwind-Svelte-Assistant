<!-- Last updated: 2025-07-30T11:02:12.769Z -->
<!--
@description: A contact section with centered introductory text, followed by a grid of office locations and their contact details. Based on Tailwind UI.
@props:
  title: string - Main title for the contact section.
  description: string - Introductory paragraph.
  offices: Array<{ 
    name: string, 
    addressLines: string[], 
    contactMethods: Array<{ type: 'email' | 'phone', value: string, href: string }>
  }> - Array of office objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50 for office cards)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary (text-indigo-600 for links)
  --theme-border-color (divide-gray-100)
  --theme-border-radius-2xl (rounded-2xl for office cards)
-->
<script lang="ts">
  export let title: string = "Get in touch";
  export let description: string = "Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.";

  export let offices = [
    {
      name: "Los Angeles",
      addressLines: ["4556 Brendan Ferry", "Los Angeles, CA 90210"],
      contactMethods: [
        { type: "email", value: "collaborate@example.com", href: "mailto:collaborate@example.com" },
        { type: "phone", value: "+1 (555) 905-2345", href: "tel:+15559052345" }
      ]
    },
    {
      name: "New York",
      addressLines: ["886 Walter Street", "New York, NY 12345"],
      contactMethods: [
        { type: "email", value: "press@example.com", href: "mailto:press@example.com" },
        { type: "phone", value: "+1 (555) 905-3456", href: "tel:+15559053456" }
      ]
    },
    {
      name: "Toronto",
      addressLines: ["7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
      contactMethods: [
        { type: "email", value: "careers@example.com", href: "mailto:careers@example.com" },
        { type: "phone", value: "+1 (555) 905-4567", href: "tel:+15559054567" }
      ]
    },
    {
      name: "Chicago", // Example, was "Say hello" in original HTML
      addressLines: ["726 Mavis Island", "Chicago, IL 60601"],
      contactMethods: [
        { type: "email", value: "hello@example.com", href: "mailto:hello@example.com" },
        { type: "phone", value: "+1 (555) 905-5678", href: "tel:+15559055678" }
      ]
    }
  ];
</script>

<div class="bg-theme-bg-base py-8 sm:py-16">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl divide-y divide-gray-100 lg:mx-0 lg:max-w-none"> {/* Themeable divide-theme-border-color */}
      <div class="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
        <div>
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900">{title}</h2> {/* Themeable text-theme-text-base */}
          <p class="mt-4 text-base/7 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
          {#each offices.slice(0, 2) as office}
            <div class="rounded-2xl bg-gray-50 p-10"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-2xl */}
              <h3 class="text-base/7 font-semibold text-gray-900">{office.name}</h3> {/* Themeable text-theme-text-base */}
              <dl class="mt-3 space-y-1 text-sm/6 text-gray-600"> {/* Themeable text-theme-text-muted */}
                {#each office.contactMethods as method}
                <div>
                  <dt class="sr-only">{method.type === 'email' ? 'Email' : 'Phone number'}</dt>
                  <dd><a class="font-semibold text-indigo-600" href={method.href}>{method.value}</a></dd> {/* Themeable text-theme-primary */}
                </div>
                {/each}
              </dl>
            </div>
          {/each}
        </div>
      </div>
      <div class="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
        <div>
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900">Locations</h2> {/* Themeable text-theme-text-base */}
          <p class="mt-4 text-base/7 text-gray-600">Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum commodo.</p> {/* Themeable text-theme-text-muted */}
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
          {#each offices as office}
            <div class="rounded-2xl bg-gray-50 p-10"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-2xl */}
              <h3 class="text-base/7 font-semibold text-gray-900">{office.name}</h3> {/* Themeable text-theme-text-base */}
              <address class="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic"> {/* Themeable text-theme-text-muted */}
                {#each office.addressLines as line}
                  <p>{line}</p>
                {/each}
              </address>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
