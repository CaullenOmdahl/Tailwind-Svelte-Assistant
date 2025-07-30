# Flex

> Last updated: 2025-07-30T11:02:12.592Z
> Source: https://tailwindcss.com/docs/flex

v4.1

⌘KCtrl K[Docs](/docs)[Blog](/blog)[Showcase](/showcase)[Sponsor](/sponsor)[Plus](/plus?ref=top)

1.  Flexbox & Grid
2.  flex

Flexbox & Grid

# flex

Utilities for controlling how flex items both grow and shrink.

Class

Styles

`flex-<number>`

`flex: <number>;`

`flex-<fraction>`

`flex: calc(<fraction> * 100%);`

`flex-auto`

`flex: 1 1 auto;`

`flex-initial`

`flex: 0 1 auto;`

`flex-none`

`flex: none;`

`flex-(<custom-property>)`

`flex: var(<custom-property>);`

`flex-[<value>]`

`flex: <value>;`

## [Examples](#examples)

### [Basic example](#basic-example)

Use `flex-<number>` utilities like `flex-1` to allow a flex item to grow and shrink as needed, ignoring its initial size:

01

02

03

```
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-1 ...">02</div>  <div class="w-32 flex-1 ...">03</div></div>
```

### [Initial](#initial)

Use `flex-initial` to allow a flex item to shrink but not grow, taking into account its initial size:

01

02

03

```
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-initial ...">02</div>  <div class="w-32 flex-initial ...">03</div></div>
```

### [Auto](#auto)

Use `flex-auto` to allow a flex item to grow and shrink, taking into account its initial size:

01

02

03

```
<div class="flex ...">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-auto ...">02</div>  <div class="w-32 flex-auto ...">03</div></div>
```

### [None](#none)

Use `flex-none` to prevent a flex item from growing or shrinking:

01

02

03

```
<div class="flex ...">  <div class="w-14 flex-none ...">01</div>  <div class="w-32 flex-none ...">02</div>  <div class="flex-1 ...">03</div></div>
```

### [Using a custom value](#using-a-custom-value)

Use the `flex-[<value>]` syntax to set the flex shorthand property based on a completely custom value:

```
<div class="flex-[3_1_auto] ...">  <!-- ... --></div>
```

For CSS variables, you can also use the `flex-(<custom-property>)` syntax:

```
<div class="flex-(--my-flex) ...">  <!-- ... --></div>
```

This is just a shorthand for `flex-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### [Responsive design](#responsive-design)

Prefix a `flex` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```
<div class="flex-none md:flex-1 ...">  <!-- ... --></div>
```

Learn more about using variants in the [variants documentation](/docs/hover-focus-and-other-states).

---
*This documentation was automatically generated from Tailwind CSS official documentation.*
