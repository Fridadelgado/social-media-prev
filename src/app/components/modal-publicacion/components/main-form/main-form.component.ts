import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {Campanias, CampaniasBody, GenericResponse} from "../../../../interfaces/campanias.interface";
import {Publicacion, PublicacionesService} from "../../../../services/publicaciones.service";
import {FileSelectInterface} from "../../interfaces/file-select.interface";
import {UploadFileService} from "../../services/upload-file.service";

@Component({
  selector: 'modal-publicacion-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent implements OnInit{
  @Input() submitted!: boolean;
  @Input() redesSociales!: any[];
  @Input() publicacion!: Publicacion;
  @Input() campanias!: Campanias[];
  @Input() imagenPrevisualizacion: string | ArrayBuffer | null = '';
  @Input() isValidFile!: boolean;
  @Input() dropZoneMessage!: string;

  @Output() emitFileSelectEvent:EventEmitter<FileSelectInterface> = new EventEmitter<FileSelectInterface>();
  constructor(
    private translate: TranslateService,
    private publicacionesService: PublicacionesService,
    private uploadFileService: UploadFileService,
  ) {
  }

  ngOnInit(): void {
    this.getCampanias();

  }


  fileType: string = "";

  updateDropZoneMessage(event: string[]): void {
    const selectedRedSocialName = event[0];
    const selectedRedSocial = this.redesSociales.find(rs => rs.nombre === selectedRedSocialName);

    if (selectedRedSocial) {
      switch (selectedRedSocial.tipoPublicacion) {
        case 'imagen':
          this.dropZoneMessage = 'Arrastra tu imagen aquí o haz clic para seleccionar';
          break;
        case 'video':
          this.dropZoneMessage = 'Arrastra tu video aquí o haz clic para seleccionar';
          break;
        case 'both':
        default:
          this.dropZoneMessage = 'Arrastra tu imagen o video aquí o haz clic para seleccionar';
          break;
      }
    } else {
      this.dropZoneMessage = 'Arrastra y suelta tu archivo aquí';
    }
  }

  onFileDrop(files: NgxFileDropEntry[]): void {
    //this.submitted = true;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          //this.uploadFileService.processFile(file, 'imagen'); // Proporciona un tipo predeterminado
          this.onFileSelect(file, 'image');
        });
        break;
      }
    }
    //this.isValidFile = this.uploadFileService.validateFile(files[0].fileEntry.name);
    // if (this.isValidFile) {
    //   this.translate.get('components.modal-publicacion.dropZoneSuccess').subscribe((res: string) => {
    //     this.dropZoneMessage = res;
    //   });
    // } else {
    //   this.translate.get('components.modal-publicacion.dropZoneValidacion').subscribe((res: string) => {
    //     this.dropZoneMessage = res;
    //   });
    // }
  }

  onFileSelect(event: any, type: string = 'imagen'): void {
    const fileSelectInterface: FileSelectInterface = { event, type };
    this.emitFileSelectEvent.emit(fileSelectInterface)
  }


  getCampanias(): void {
    this.publicacionesService.getCampanias()
      .subscribe((response: GenericResponse<CampaniasBody>) => {
          if (response)
            this.campanias = response.body.data;
        },
        (error) => {
          console.error('Error al obtener las campañas:', error);
        }
      );
  }

  agregarNuevaCampania(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const nuevaSubcampania = inputElement.value.trim();
    let nuevaCampania: Campanias = { idsubcampanas: 0, nombrecampana: '', status: 0, idredsocial: 0, idpublicacion: 0, idusuario: 0, iddistribuidor: 0, fechainicio: '', fechafin: '' };
    nuevaCampania.nombrecampana = nuevaSubcampania;
    this.publicacionesService.setNuevaCampania(nuevaCampania).subscribe((response: GenericResponse<string>) => {
        if (response) {
          inputElement.value = '';
          this.getCampanias();
        }
      },
      (error) => {
        console.error('Error al obtener las campañas:', error);
      }
    );
  }

}
