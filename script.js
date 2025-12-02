function segments(n,a,b,c) {
    const arrayOne = [];
    const arrayTwo = [];
    for (let index = 0; index <= n; index+=a) {
        arrayOne.push(index);
    }
    for (let index = n; index >=0; index-=b) {
        arrayTwo.push(index);
    }
    
    const sortedArrayTwo = arrayTwo.sort((a,b) => a - b);
    
    const intervals = [];

    for (let i = 0; i < arrayOne.length; i++) {
        const pointOne = arrayOne[i];

        for (let j = 0; j < sortedArrayTwo.length; j++) {
            const pointTwo = sortedArrayTwo[j];
            if (Math.abs(pointTwo-pointOne)===c) {
                const left = Math.min(pointOne, pointTwo);
                const right = Math.max(pointOne, pointTwo);
                intervals.push([left, right]); 
            }
        }
    }
    if (intervals.length === 0) {
        return n;
    }    
    intervals.sort((a,b)=>a[0]-b[0]);
    let merged = [];
    let [curL, curR] = intervals[0];
    for (let index = 0; index < intervals.length; index++) {
        const [L,R] = intervals[index];

        if (L<=curR) {
            curR = Math.max(curR,R)
        } else {
            merged.push([curL,curR]);
            [curL,curR] = [L,R];
        }
    }

    merged.push([curL,curR]);

    let redLength = 0;

    for (const [L,R] of merged) {
        redLength += (R-L);
    }
    
    const unColored = n - redLength;
    console.log(unColored);
    
    return {arrayOne,arrayTwo,merged};    
}

const n = 10;
const a = 2;
const b = 3;
const c = 1;

segments(n,a,b,c);

const data = segments(n,a,b,c);
const line = document.getElementById("line");
const scale = 700 / n;

for (let [L,R] of data.merged) {
    const div = document.createElement("div");
    div.className = "interval";
    div.style.left = (L * scale) + "px";
    div.style.width = ((R - L) * scale) + "px";
    line.appendChild(div);
}

for (let p of data.arrayOne) {
    const dot = document.createElement("div");
    dot.className = "point g";
    dot.style.left = (p * scale) + "px";
    line.appendChild(dot);
}
for (let p of data.arrayTwo) {
    const dot = document.createElement("div");
    dot.className = "point r";
    dot.style.left = (p * scale) + "px";
    line.appendChild(dot);
}