/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComputedRef, computed } from 'vue';

import notes_normal from '@/assets/note_icon/notes_normal.png';
import notes_flick from '@/assets/note_icon/notes_flick.png';
import notes_hold from '@/assets/note_icon/notes_hold.png';
import notes_relay from '@/assets/note_icon/notes_relay.png';
// ItemSource can be fetched from /api/extra/ItemSource/<ItemId>.json

// Ref<HTMLCanvasElement[]>
const endNoteId: number[] = [12, 13, 23, 24];
let speed = 350;
let showLine = true;

function chart(musicTime: number, encodeNote: string): HTMLCanvasElement[] {
  const canvasList: HTMLCanvasElement[] = [];
  const width = 100;
  const height = 1000;
  const paddingSize = 10;
  const availableWidth: number = width - paddingSize * 2;
  const stepWidth: number = availableWidth / 6;

  if (encodeNote) {
    // split note
    const encodeNoteList: number[][] = JSON.parse(encodeNote);

    const numberOfCanvas: number = Math.ceil((musicTime * speed) / height);

    // split encodenot into n canvas
    const organizeEncodeNote: number[][][] = [];
    // get all hold encodenote
    const organizeHoldEncodeNote: number[][][] = [];

    organizeHoldEncodeNote.push(
      encodeNoteList.filter(ele => ele[3] >= 0 && ele[0] !== 2),
    );

    for (let i = 0; i < numberOfCanvas; i++) {
      const result = encodeNoteList.filter(
        ele =>
          ele[1] * speed < height * (i + 1) && ele[1] * speed > height * i,
      );
      organizeEncodeNote.push(result);
    }

    // start genertae chart
    for (let i = 0; i < organizeEncodeNote.length; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      // initialize
      initialChart(
        ctx,
        canvas.width,
        canvas.height,
        availableWidth,
        paddingSize,
        stepWidth,
      );
      // for each canvas
      for (const ele of organizeEncodeNote[i]) {
        const heightForNote: number = height - ele[1] * speed + height * i;
        const noteRow: number = stepWidth * (ele[2] - 1) + paddingSize;

        if (showLine === true) {
          const index: number = organizeEncodeNote[i].indexOf(ele);
          if (index + 1 < organizeEncodeNote[i].length) {
            if (
              organizeEncodeNote[i][index + 1][1] === ele[1]
              && organizeEncodeNote[i][index + 1][0] !== 22
              && ele[0] !== 22
            ) {
              const tempNoteRow: number
                = stepWidth * organizeEncodeNote[i][index + 1][2] + paddingSize;

              drawMultiLineNote(
                ctx,
                noteRow - tempNoteRow,
                tempNoteRow,
                heightForNote,
              );
            }
          }
        }
        if (organizeHoldEncodeNote[0].includes(ele) === true) {
          holdPahtHelper(
            ctx,
            stepWidth,
            height,
            speed,
            stepWidth,
            paddingSize,
            i,
            ele,
            organizeHoldEncodeNote[0],
          );
        }

        // green
        if (ele[0] === 1)
          drawNoteNormal(ctx, stepWidth, noteRow, heightForNote);

        // pink
        else if (ele[0] === 2 || ele[0] === 13 || ele[0] === 24)
          drawNoteFlick(ctx, stepWidth, noteRow, heightForNote);
        else if (
          ele[0] === 11
          || ele[0] === 12
          || ele[0] === 21
          || ele[0] === 23
        )
          drawNoteHold(ctx, stepWidth, noteRow, heightForNote);
        else if (ele[0] === 22)
          drawRelayNote(ctx, stepWidth, noteRow, heightForNote);
      }

      canvasList.push(canvas);
    }
  }

  return canvasList;
}

function holdPahtHelper(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  height: number,
  speed: number,
  stepWidth: number,
  paddingSize: number,
  canvasNumber: number,
  ele: number[],
  organizeHoldEncodeNote: number[][],
): void {
  const index: number = organizeHoldEncodeNote.indexOf(ele);
  for (let i: number = index + 1; i < organizeHoldEncodeNote.length; i++) {
    if (organizeHoldEncodeNote[i][3] === ele[3]) {
      if (!endNoteId.includes(ele[0])) {
        const heightForNote: number
          = height - ele[1] * speed + height * canvasNumber;
        const noteRow: number = stepWidth * (ele[2] - 1) + paddingSize;

        const tempHeightForNote: number
          = height - organizeHoldEncodeNote[i][1] * speed + height * canvasNumber;
        const tempNoteRow: number
          = stepWidth * (organizeHoldEncodeNote[i][2] - 1) + paddingSize;
        drawBHoldNote(
          ctx,
          noteSize,
          tempNoteRow,
          tempHeightForNote,
          noteRow,
          heightForNote,
        );
        break;
      }
    }
  }

  for (let i: number = index - 1; i > 0; i--) {
    if (organizeHoldEncodeNote[i][3] === ele[3]) {
      if (
        !endNoteId.includes(organizeHoldEncodeNote[i][0])
        && height * canvasNumber >= organizeHoldEncodeNote[i][1] * speed
      ) {
        const heightForNote: number
          = height - ele[1] * speed + height * canvasNumber;
        const noteRow: number = stepWidth * (ele[2] - 1) + paddingSize;

        const tempHeightForNote: number
          = height - organizeHoldEncodeNote[i][1] * speed + height * canvasNumber;
        const tempNoteRow: number
          = stepWidth * (organizeHoldEncodeNote[i][2] - 1) + paddingSize;
        drawBHoldNote(
          ctx,
          noteSize,
          tempNoteRow,
          tempHeightForNote,
          noteRow,
          heightForNote,
        );
      }
      return;
    }
  }
}

function drawBHoldNote(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
  tempxPosition: number,
  tempyPosition: number,
): void {
  const temp: number = noteSize / 2;
  ctx!.beginPath();
  ctx!.beginPath();
  ctx!.moveTo(xPosition, yPosition + temp);
  ctx!.lineTo(xPosition + noteSize, yPosition + temp); // (x,y)
  ctx!.lineTo(tempxPosition + noteSize, tempyPosition + temp);
  ctx!.lineTo(tempxPosition, tempyPosition + temp);
  ctx!.fillStyle = 'rgba(135, 206, 235,0.5)';
  ctx!.fill();
}

function initialChart(
  ctx: CanvasRenderingContext2D | null,
  totalWidth: number,
  totalHeight: number,
  availableWidth: number,
  padding: number,
  stepWidth: number,
): void {
  // background color
  ctx!.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx!.fillRect(padding, 0, availableWidth, totalHeight);
  // left line
  drawInitialLine(ctx, padding, 0, padding, totalHeight, 3);
  // right line
  drawInitialLine(
    ctx,
    totalWidth - padding,
    0,
    totalWidth - padding,
    totalHeight,
    3,
  );
  // middle lines
  for (let i = 1; i <= 5; i++) {
    const tempWidth = padding + stepWidth * i;
    drawInitialLine(ctx, tempWidth, 0, tempWidth, totalHeight, 1);
  }
}

// function generateChart(chartNumber: number,) {}

function drawInitialLine(
  ctx: CanvasRenderingContext2D | null,
  startWidth: number,
  startHeight: number,
  endWidth: number,
  endHeight: number,
  lineWidth: number,
): void {
  ctx!.lineWidth = lineWidth;
  ctx!.beginPath();
  ctx!.moveTo(startWidth, startHeight);
  ctx!.lineTo(endWidth, endHeight);
  ctx!.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx!.stroke();
}

async function drawNoteNormal(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
): Promise<void> {
  const image = new Image();
  image.onload = await function () {
    ctx!.drawImage(image, xPosition, yPosition, noteSize, noteSize);
  };
  image.src = notes_normal;
}

async function drawNoteFlick(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
): Promise<void> {
  const image = new Image();
  image.onload = await function () {
    ctx!.drawImage(image, xPosition, yPosition, noteSize, noteSize);
  };
  image.src = notes_flick;
}

async function drawNoteHold(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
): Promise<void> {
  const image = new Image();
  image.onload = await function () {
    ctx!.drawImage(image, xPosition, yPosition, noteSize, noteSize);
  };
  image.src = notes_hold;
}

async function drawRelayNote(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
): Promise<void> {
  const image = new Image();
  image.onload = await function () {
    ctx!.drawImage(image, xPosition, yPosition, noteSize, noteSize / 4);
  };
  image.src = notes_relay;
}

function drawMultiLineNote(
  ctx: CanvasRenderingContext2D | null,
  noteSize: number,
  xPosition: number,
  yPosition: number,
): void {
  const temp: number = noteSize / 9;
  ctx!.beginPath();
  ctx!.moveTo(xPosition, yPosition - temp);
  ctx!.lineTo(xPosition + noteSize, yPosition - temp); // (x,y)
  ctx!.lineWidth = noteSize / 2;
  ctx!.strokeStyle = 'white';
  ctx!.stroke();
}
export function useGenerateSongChart(
  musicalScores: ComputedRef<[number, string][]>,
) {
  return computed(() => musicalScores.value.map(a => chart(a[0], a[1])));
}
export function helperChangeSpeed(value: number): void {
  speed = value;
}
export function helperChangeLine(value: boolean): void {
  showLine = value;
}
