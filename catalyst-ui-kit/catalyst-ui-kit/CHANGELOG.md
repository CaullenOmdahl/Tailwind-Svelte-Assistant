# Changelog

## 2025-04-28

- Update template to Tailwind CSS v4.1.4

## 2025-04-22

- Fix focus styles in the `Avatar`, `Badge`, `Button`, `Checkbox`, and `Switch` components ([#1693](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1693))

## 2025-04-17

- Update `@headlessui/react` dependency to `v2.2.2` to fix listbox performance issues ([#1667](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1667))

## 2025-04-04

- Add new `Combobox` component
- Add new `AuthLayout` component, with example login page, registration page, and forgot password page
- Fix centering of checkboxes, radios, and switches in fields with multi-line labels
- Update template to Tailwind CSS v4.1.3
- Update template to Headless UI v2.2.1 (required for new `Combobox` component)

## 2025-03-24

- Adjust avatar ring opacity from 20% to 10%

## 2025-03-22

- Update template to Tailwind CSS v4.0.15

## 2025-02-22

- Fix border radius of avatars in navbar items

## 2025-02-12

- Fix baseline alignment for buttons with icons ([#1668](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1668))

## 2025-02-10

- Update template to Tailwind CSS v4.0.6

## 2025-01-29

- Fix conflicting outline utilities ([#1661](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1661))

## 2025-01-23

- Update template to Tailwind CSS v4.0

## 2024-10-31

- Fix `disabled` prop in `DropdownItem` component ([#1640](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1640))
- Update types in `SidebarItem` component

## 2024-06-09

- Omit `as` prop from types for Headless UI-based components

## 2024-06-26

- Update `@headlessui/react` dependency to `v2.1.1`
- Update `Dialog`, `Alert`, and `Listbox` to new data-attribute-based transition API

## 2024-06-21

- Update `@headlessui/react` dependency to `v2.1.0`
- Use `DialogBackdrop` in `Alert` and `Dialog` components
- Update to new data-attribute-based transition API

## 2024-06-19

- Prevent content from overflowing the mobile sidebar

## 2024-06-18

- Use consistent `let` and `const` declarations
- Use consistent `clsx` import
- Use consistent `forwardRef` instead of `React.forwardRef` import
- Update `tailwindcss`, `prettier` and `prettier-plugin-tailwindcss` dependencies in Next.js demo app
- Fix class order in `Dropdown` component

## 2024-06-10

- Add `dark:[color-scheme:dark]` class to `Input` component ([#1596](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1596))

## 2024-05-31

- Add Next.js demo app ([#1580](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1580))
- Fix `Avatar` sizing and padding ([#1588](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1588))

## 2024-05-27

- Add `pointer-events-none` to `InputGroup` icon ([#1594](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1594))
- Add default text color to `Table` component ([#1581](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1581))
- Fix TypeScript issues when using `as={Link}` ([#1582](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1582))
- Fix `SidebarItem` import ([#1582](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1582))
- Add `isolate` class to `InputGroup`, `SidebarLayout`, and `StackedLayout` components
- Fix comment indentation and use proper DocBlocks

## 2024-05-24

- Add new `SidebarLayout` component
- Add new `StackedLayout` component
- Add new `Navbar` component
- Add new `Sidebar` component
- Add new `DescriptionList` component
- Add new `Heading` component
- Add new `Divider` component
- Add new `framer-motion` dependency
- Update `@headlessui/react` dependency to `v2.0`
- Remove `as={Fragment}` from the transition components
- Improve and fix a number of types
- Made formatting of `className` and `{...prop}` more consistent across all components
- Made formatting of `forwardRef` consistent across all components
- Update `PaginationGap` component to use a `span` instead of a `div`
- Update the `SidebarHeading` to render use an `h3` instead of a `d`iv
- Remove `children` prop from `Switch` component

## 2024-01-08

- Add `resizable` prop to `Textarea` component ([#1543](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1543))

## 2024-01-03

- Change top-level `let` declarations to `const`
- Fix `--btn-hover-overlay` color for dark/white button ([#1538](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1538))
- Add `forwardRef` to `Input`, `Select`, and `Textarea` components ([#1540](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1540))

## 2023-12-20

- Initial release
