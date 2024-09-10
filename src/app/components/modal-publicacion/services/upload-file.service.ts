import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  isValidFile: boolean = false;
  tipoArchivo: string = '';
  imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
  dropZoneMessage: string = "";
  fileType: string = "";
  imagenPrevisualizacion: string | ArrayBuffer | null = '';

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }



  updateDropZoneMessage(event: string[], redesSociales:any[]): void {
    const selectedRedSocialName = event[0];
    const selectedRedSocial = redesSociales.find(rs => rs.nombre === selectedRedSocialName);

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

   onFileSelect(isValidFile: boolean): Observable<string>  {
      const translationKey = isValidFile ? 'components.modal-publicacion.dropZoneSuccess' : 'components.modal-publicacion.dropZoneValidacion';

      return this.translate.get(translationKey);
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

  processFile(file: File, type: string): FileReader {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        console.error('Error al leer el archivo');
        throw new Error('Error al leer el archivo');
      }
    };

    reader.onerror = (error) => {
      console.error('Error al cargar el archivo: ', error);
    };

    reader.readAsDataURL(file);
    return reader;
  }

}
