// Used by: area.entity
export enum LabelArea {
  NONE = -1,
  ROOM_0, // Living room
  ROOM_1, // Night room
  ROOM_2  // Water room
}

// Used by: room.entity
export enum PictoType {
  NONE = -1,
  ROOM_0,  // Living room
  ROOM_1,  // Dining room
  ROOM_2,  // Bedroom
  ROOM_3,  // Child bedroom
  ROOM_4,  // Child room
  ROOM_5,  // Kitchen
  ROOM_6,  // Office
  ROOM_7,  // Terrace
  ROOM_8,  // Bathroom
  ROOM_9,  // Bathtub
  ROOM_10, // Dressing room
  ROOM_11, // Game room
  ROOM_12, // Kitchen Bis
  ROOM_13, // Library
  ROOM_14  // Garage
}

// USed by: service.entity
export enum ServiceType {
    NONE= 0,
    SERVICE_0 //Chauffage
}

export enum StateType {
    OFF = 0,
    STATE_0, // Chauffage_confort
    STATE_1, // Chauffage_eco
    STATE_2  // Chauffage_hors_gel
}

export enum ModeType {
    MODE_0, // Chauffage_disabled
    MODE_1, // Chauffage_manuel
    MODE_2  // Chauffage_planning
}

// Used by: device.entity
export enum DeviceType {
    DEVICE_1 = 1, // Divers,
    DEVICE_2,     // Eclairage,
    DEVICE_3,     // Chauffage,
    DEVICE_4,     // Volet_roulant,
    DEVICE_5      // Consomation
}
