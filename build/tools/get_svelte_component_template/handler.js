// Handler for get_svelte_component_template tool
import { shadcnButtonSvelte, shadcnCardSvelte, shadcnAlertSvelte, shadcnDialogSvelte, HEADLESSUI_MENU_TEMPLATE, HEADLESSUI_DIALOG_TEMPLATE, HEADLESSUI_SWITCH_TEMPLATE } from "../../templates/index.js";
export function handleGetSvelteComponentTemplate(args) {
    switch (args.component_name) {
        case "headlessui-menu":
            return { template: HEADLESSUI_MENU_TEMPLATE };
        case "headlessui-dialog":
            return { template: HEADLESSUI_DIALOG_TEMPLATE };
        case "headlessui-switch":
            return { template: HEADLESSUI_SWITCH_TEMPLATE };
        case "shadcn-button":
            return { template: shadcnButtonSvelte };
        case "shadcn-card":
            return { template: shadcnCardSvelte };
        case "shadcn-alert":
            return { template: shadcnAlertSvelte };
        case "shadcn-dialog":
            return { template: shadcnDialogSvelte };
        default:
            return {
                error: {
                    code: "UnknownComponent",
                    message: `Unknown component_name: ${args.component_name}`,
                },
            };
    }
}
