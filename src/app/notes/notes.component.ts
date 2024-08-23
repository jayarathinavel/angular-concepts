import {Component} from '@angular/core';
import {NotesService} from "./service/notes.service";
import {Notes} from "./model/notes";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {HotToastService} from "@ngneat/hot-toast";
import {UtilityFunctions} from "../utility-classes/utility-functions";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [UtilityFunctions]
})
export class NotesComponent {

  allNotes: Notes[];
  note: Notes;
  isColorBoxOpen: boolean;
  backgroundColors: string[] = ['#FFA07A', '#DC143C', '#FF7F50', '#FF4500', '#FFFACD', '#BDB76B', '#7FFF00', '#228B22',
    '#228B22', '#808000', '#7FFFD4', '#008080', '#ADD8E6', '#00008B', '#7B68EE', '#E6E6FA', '#EE82EE', '#8A2BE2',
    '#4B0082', '#FFC0CB', '#FF1493', '#FAEBD7', '#D3D3D3', '#000000'];

  constructor(private notesService: NotesService, private modalService: NgbModal, modalConfig: NgbModalConfig,
  private toastService: HotToastService, private utilityFunctions: UtilityFunctions
  ) {
    modalConfig.backdrop = "static";
    modalConfig.keyboard = false;
  }
  ngOnInit(): void {
    this.getAllNotes();
  }
  getAllNotes() {
    this.notesService.getAllNotes().subscribe({
      next: response => {
        this.allNotes = response;
        this.toastService.success("Notes Fetched")
      },
      error: error => {
        this.toastService.error("Error Occurred")
        console.log(error)
      }
    })
  }
  updateNotes(){
    this.toastService.loading("Updating Note",{id:"updatingToast"})
    this.notesService.updateNotes(this.allNotes).subscribe({
        next: data => {
          this.toastService.close("updatingToast")
        },
        error: error => {
          this.toastService.close("updatingToast");
          this.toastService.error("Error Occurred")
        }
      }
    );
  }
  deleteNote(noteId:number){
    this.allNotes.splice(this.allNotes.findIndex((note: Notes) => note.noteId === noteId),1);
    this.updateNotes();
    this.modalService.dismissAll();
  }
  /* To Open Color Picker inside Note Modals */
  toggleColorBox(): void {
    this.isColorBoxOpen = !this.isColorBoxOpen;
  }
  selectColor(color: string): void {
    this.note.backgroundColor = color;
    this.isColorBoxOpen = false;
  }
  /* To Open Note Modal (View) */
  openModal(noteInfo: Notes, noteDialog: any) {
    this.modalService.open(noteDialog);
    this.note = noteInfo;
  }
  /* To close Note Modals (View and Add) */
  closeModal() {
    this.updateNotes();
    this.isColorBoxOpen = false;
    this.modalService.dismissAll();
  }
  /* To Use Div as a Text box */
  onInputChange(event: any) {
    this.note.note = event.target.innerText;
  }
  /* To get Suitable Foreground Color (B/W) based on Background Color */
  getForegroundColor(backgroundColor: string) {
    return this.utilityFunctions.getContrastColor(backgroundColor);
  }
  /* To Open Add Note Modal */
  openAddNoteModal(noteDialog: any){
    this.modalService.open(noteDialog);
    this.note = new Notes();
    this.note.backgroundColor = "#FAEBD7";
    this.allNotes.push(this.note);
  }

}
