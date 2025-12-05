// logic for panel group, including layout dependency

function PanelGroup(navProg, panelInstances) {
    let group = [];
    const panelSpacing = 1/(panelInstances-1);
    const start = 0.5*panelSpacing;
    const end = 1-(0.5*panelSpacing);

    if (navProg<start) {
        group = [-1, 0, 1];
    } else if (navProg>end) {
        group = [panelInstances-2, panelInstances-1, -1];
    } else {
        const currentID = Math.ceil(navProg/panelSpacing);
        group = [currentID-1, currentID, currentID+1];
    }

    return group;
};
export default PanelGroup;