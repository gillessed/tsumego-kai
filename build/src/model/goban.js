import { randomString } from './utils';
export function emptyBoard(size, type) {
    const initialStones = [];
    for (let i = 0; i < size * size; i++) {
        initialStones.push('empty');
    }
    const initialBoardState = {
        id: randomString(),
        stones: initialStones,
        markups: [],
        text: '',
        moves: {},
        reverseMoves: {},
    };
    return {
        size,
        type,
        metadata: {},
        initialBoardState: initialBoardState.id,
        boardStates: {
            [initialBoardState.id]: initialBoardState,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29iYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvZ29iYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQWtFdkMsTUFBTSxxQkFBcUIsSUFBWSxFQUFFLElBQWdCO0lBQ3ZELE1BQU0sYUFBYSxHQUFrQixFQUFFLENBQUM7SUFDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsTUFBTSxpQkFBaUIsR0FBZTtRQUNwQyxFQUFFLEVBQUUsWUFBWSxFQUFFO1FBQ2xCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtRQUNULFlBQVksRUFBRSxFQUFFO0tBQ2pCLENBQUM7SUFDRixNQUFNLENBQUM7UUFDTCxJQUFJO1FBQ0osSUFBSTtRQUNKLFFBQVEsRUFBRSxFQUFFO1FBQ1osaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsRUFBRTtRQUN2QyxXQUFXLEVBQUU7WUFDWCxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQjtTQUMxQztLQUNGLENBQUM7QUFDSixDQUFDIn0=