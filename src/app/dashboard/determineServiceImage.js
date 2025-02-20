const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:3000/uploads/";

/**
 * Determines the correct image path for a service or business.
 * @param {Object} service - The service result from the database.
 * @returns {Object} An object containing the thumbnail of the service.
 */
export function determineServiceImage(service) {
    let serviceImage = ""
    let foundimage = 0

// console.log("🔍 Service:", service.service_image);
 //console.log("🔍 Business:", service.business_profile_image);

    // Check which image is available
    if (foundimage == 0) {
        if (service.service_image != null) {
            serviceImage = service.service_image
            foundimage = 1
        }
    }
    if (foundimage == 0) {
        if (service.business_profile_image != null) {
            serviceImage = service.business_profile_image
            foundimage = 1
        }
    }
    if (foundimage == 0) {
        serviceImage = "placeholder.jpg"
        foundimage = 1
    }

    serviceImage = BASE_URL + "thumbnail/" + serviceImage;    

  return {
    service_image_thumbnail: serviceImage,
  };
}
