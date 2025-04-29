# Sistema de Procesamiento Masivo de Datos

## Descripción del Proyecto

Este proyecto es un servicio backend desarrollado en **NestJS** para el procesamiento masivo de archivos estructurados (CSV y XLSX), utilizando procesamiento en segundo plano (Workers + Colas Bull), almacenamiento en base de datos PostgreSQL, y notificaciones en tiempo real a través de WebSockets.

---

## Tecnologías Utilizadas

- **NestJS** - Framework principal de backend.
- **PostgreSQL** - Base de datos relacional.
- **Redis** - Sistema de mensajería para colas Bull.
- **Docker y Docker Compose** - Contenerización y orquestación de servicios.
- **WebSockets** - Comunicación en tiempo real entre servidor y cliente.
- **Bull** - Manejo de colas de trabajo asíncrono.

---

## 🚀 Cómo correr el proyecto (Docker paso a paso)

### 1. Requisitos previos

- Tener instalado **Docker** y **Docker Compose**.

### 2. Clonar el repositorio

```bash
git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/novakmzv/data-processing-system.git)
cd data-processing-system 
````

### 3. Construir y levantar los contenedores:

```bash
docker-compose up --build
````

### 4. Construir y levantar los contenedores:

```bash
http://localhost:3000
````

## Roadmap

- URL: POST http://localhost:3000/upload

- Método: POST

- Tipo de Body: form-data

- Clave: file

- Valor: (Seleccionar un archivo .csv o .xlsx)

## Notas

- Solo se permiten archivos .csv o .xlsx.

- Se aplica limitación de 1 archivo por minuto por cliente.

- La base de datos y Redis se levantan automáticamente con Docker.


