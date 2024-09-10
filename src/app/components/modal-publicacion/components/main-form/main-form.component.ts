import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {Campanias, CampaniasBody, GenericResponse} from "../../../../interfaces/campanias.interface";
import {Publicacion, PublicacionesService} from "../../../../services/publicaciones.service";
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

  constructor(
    private translate: TranslateService,
    private publicacionesService: PublicacionesService,
    private uploadFileService: UploadFileService,
  ) {
  }

  ngOnInit(): void {
    this.getCampanias();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }

  isValidFile: boolean = false;
  tipoArchivo: string = '';
  imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
  dropZoneMessage: string = "";
  fileType: string = "";
  imagenPrevisualizacion: string | ArrayBuffer | null = '';

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
    this.submitted = true;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.processFile(file, 'imagen'); // Proporciona un tipo predeterminado
        });
        break;
      }
    }
    this.isValidFile = this.validateFile(files[0].fileEntry.name);
    if (this.isValidFile) {
      this.translate.get('components.modal-publicacion.dropZoneSuccess').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    } else {
      this.translate.get('components.modal-publicacion.dropZoneValidacion').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    }
  }

  onFileSelect(event: any, type: string = 'imagen'): void {
    const file = event.target.files[0];
    if (file) {
      this.submitted = true;
      this.isValidFile = this.uploadFileService.validateFile(file.name);
      this.dropZoneMessage = this.uploadFileService.onFileSelect(this.isValidFile);

      if (this.isValidFile) {
        this.uploadFileService.processFile(file, type);
      }
    }
  }

  validateFile(fileName: string): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.mp4|\.avi|\.mov|\.mkv|\.flv|\.wmv)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }

  detectFileType(dataUri: string | ArrayBuffer): string {
    const fileTypeRegex = /^data:(image|video)\/([a-zA-Z0-9]+);base64,/;
    const match = dataUri.toString().match(fileTypeRegex);
    if (match) {
      this.fileType = match[1];
      return this.fileType;
    } else {
      return 'unknown';
    }
  }

  processFile(file: File, type: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.detectFileType(reader.result);
        if (type === 'miniatura') {
          this.publicacion.miniatura = reader.result.toString();
        } else if (type === 'subtitulos') {
          this.publicacion.subtitulos = reader.result.toString();
        } else {
          this.publicacion.imagen = reader.result.toString();
          this.publicacion.video = reader.result.toString();
          this.imagenPrevisualizacion = reader.result;
        }
      } else {
        console.error('Error al leer el archivo');
      }
    };

    reader.onerror = (error) => {
      console.error('Error al cargar el archivo: ', error);
    };

    reader.readAsDataURL(file);
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
