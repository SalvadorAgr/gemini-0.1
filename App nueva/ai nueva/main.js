const { app, BrowserWindow } = require('electron');
const path = require('node:path');

// Mantén una referencia global del objeto ventana, si no lo haces, la ventana
// se cerrará automáticamente cuando el objeto JavaScript sea recolectado por el recolector de basura.
let mainWindow;

function createWindow() {
  // Crea la ventana del navegador.
  mainWindow = new BrowserWindow({
    width: 1200, // Ancho de la ventana
    height: 800, // Alto de la ventana
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Si tuvieras un script de precarga
      nodeIntegration: false, // Es buena práctica mantenerlo en false por seguridad
      contextIsolation: true, // Es buena práctica mantenerlo en true
    },
  });

  // Carga la URL de tu aplicación Next.js.
  // Asegúrate de que tu app Next.js esté corriendo en localhost:3000
  // cuando inicies Electron.
  mainWindow.loadURL('http://localhost:3000');

  // Abre las herramientas de desarrollo (opcional, para depurar).
  // mainWindow.webContents.openDevTools();

  // Emitido cuando la ventana es cerrada.
  mainWindow.on('closed', function () {
    // Elimina la referencia al objeto ventana, usualmente guardarías las ventanas
    // en un array si tu aplicación soporta múltiples ventanas, este es el momento
    // en el que deberías borrar el elemento correspondiente.
    mainWindow = null;
  });
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas de navegador.
// Algunas APIs pueden ser usadas solo después de que este evento ocurra.
app.on('ready', createWindow);

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', function () {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que permanezcan activas hasta que el usuario salga explícitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es presionado y no hay otras ventanas abiertas.
  if (mainWindow === null) {
    createWindow();
  }
});

// En este archivo puedes incluir el resto del código del proceso principal de tu aplicación.
// También puedes ponerlos en archivos separados y requerirlos aquí.
