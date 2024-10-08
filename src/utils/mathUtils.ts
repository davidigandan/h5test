export const generatePoints = (waveType = "sine", points = 360) => {
    const xValues = Array.from({ length:points }, (_, i) => i);
    const yValues = xValues.map ((xValue) =>
        waveType === "sine" ? Math.sin(xValue * (Math.PI /180)) : Math.cos(xValue * (Math.PI/180))
    );

return [xValues, yValues];
};