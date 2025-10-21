// Monaco Editor Test - TypeScript
interface Editor {
  file: string | null;
  content: string;
  lineNumbers: boolean;
}

export class MonacoEditor implements Editor {
  file: string | null = null;
  content: string = '';
  lineNumbers: boolean = true;
  
  save(): void {
    console.log('Saved!');
  }
}