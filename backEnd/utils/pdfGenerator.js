import PDFDocument from "pdfkit";

const pdfGenerator = (trip) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 30 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on("error", reject);

    // ====== CONTENU PDF ======
    doc.fontSize(18).text("Rapport du Trajet", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Camion : ${trip.truck?.matricule || "N/A"}`);
    doc.text(`Conducteur : ${trip.driver?.fullname || "N/A"}`);
    doc.text(`Départ : ${trip.startLocation}`);
    doc.text(`Arrivée : ${trip.endLocation}`);
    doc.text(`Date : ${new Date(trip.startDate).toLocaleDateString("fr-FR")}`);
    doc.text(`Km départ : ${trip.kilometrageDepart}`);
    doc.text(`Km arrivée : ${trip.kilometrageArrivee}`);
    doc.text(`Remarques : ${trip.remarks || "Aucune"}`);

    doc.end();
  });
};

export default pdfGenerator;
