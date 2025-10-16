import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- Data and Translations (moved outside the component for better performance) ---
const translations = {
    th: { main_title: "คำนวนราคาด้วยตัวคุณเอง", main_subtitle: "วางแผนงบประมาณสำหรับวันสำคัญของคุณในไม่กี่ขั้นตอน", section1_title: "เลือกประเภทการใช้งาน", wedding_package_title: "Wedding", wedding_package_subtitle: "งานแต่งงาน", event_package_title: "Event", event_package_subtitle: "งานอีเวนต์", studio_package_title: "Shooting", studio_package_subtitle: "ถ่ายภาพนิ่งและภาพเคลื่อนไหว", section_zone_title: "เลือกโซนจัดงาน", zone_small_title: "SMALL", zone_small_subtitle: "THE HOME BAR & TERRACE", zone_small_guests: "30 - 50 ท่าน", zone_medium_title: "MEDIUM", zone_medium_subtitle: "HALF AREA / HALL ZONE", zone_medium_guests: "51 - 100 ท่าน", zone_large_title: "LARGE", zone_large_subtitle: "ALL AREA", zone_large_guests: "100 - 300 ท่าน", section3_title: "กรอกข้อมูลเบื้องต้น", guests_label: "จำนวนแขก", time_label: "ช่วงเวลา", venue_morning: "ครึ่งวันเช้า (6.00 - 13.30)", venue_evening: "ครึ่งวันเย็น (16.00 - 22.00)", venue_full_day: "เต็มวัน (6.00 - 22.00)", section_package_choice_title: "เลือกแพ็คเกจ", package_a_title: "PACKAGE A : THE VENUE", package_a_subtitle: "แพ็กเกจที่เน้นความสมบูรณ์ของสถานที่ให้คุณ Custom ด้วยตัวเอง", pkg_a_zone_req: "เฉพาะโซน LARGE", pkg_a_price_label: "ราคา", pkg_a_price: "150,000.-", pkg_a_space_label: "พื้นที่", pkg_a_space: "All Area", pkg_a_duration_label: "ระยะเวลา", pkg_a_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_a_facilities_title: "สิ่งอำนวยความสะดวก", pkg_a_fac_1: "ชุดเซ็ตโซฟา และพรม", pkg_a_fac_2: "เก้าอี้ Chiavari 200 ตัว และโต๊ะสตูลสูง 20 ตัว", pkg_a_fac_3: "ระบบแสงเสียงขั้นพื้นฐาน พร้อมไมโครโฟน 4 ตัว", pkg_a_fac_4: "อุปกรณ์สำหรับพิธีสงฆ์", pkg_a_fac_5: "ขาตั้งรูป", pkg_a_fac_6: "ชุดน้ำชา", pkg_a_deco_title: "ชุดตกแต่งสถานที่", pkg_a_deco_note: "จุดตกแต่งในแพ็กเกจ ( เลือกรับเซ็ตดอกไม้พื้นฐาน หรือนำเข้าทีมตกแต่ง)", pkg_a_deco_1: "ช่อดอกไม้เจ้าสาว 1 ช่อ", pkg_a_deco_2: "ดอกไม้ติดหน้าอก 6 ชิ้น", pkg_a_deco_3: "ชุดตกแต่งโต๊ะลงทะเบียน", pkg_a_deco_4: "ป้ายต้อนรับหน้างาน", pkg_a_deco_5: "แสตนด์ดอกไม้ 1 คู่", package_b_title: "PACKAGE B : THE FINEST", package_b_subtitle: "แพ็กเกจสถานที่พร้อมการตกแต่ง", pkg_b_zone_req: "เฉพาะโซน LARGE", pkg_b_price_label: "ราคา", pkg_b_price: "220,000.-", pkg_b_space_label: "พื้นที่", pkg_b_space: "All Area", pkg_b_duration_label: "ระยะเวลา", pkg_b_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_b_facilities_title: "สิ่งอำนวยความสะดวก", pkg_b_fac_from_a: "สิ่งอำนวยความสะดวกพื้นฐานจาก The Venue Package", pkg_b_fac_plus_1: "ผ้าเฉด หรือ ไฟปิงปอง", pkg_b_fac_plus_2: "ดอกไม้ตกแต่งขอบหน้าต่าง", pkg_b_deco_title: "ชุดตกแต่ง The Finest", pkg_b_deco_1: "ช่อดอกไม้เจ้าสาว 1 ช่อ", pkg_b_deco_2: "ดอกไม้ติดหน้าอก 6 ชิ้น", pkg_b_deco_3: "ชุดตกแต่งโต๊ะลงทะเบียน", pkg_b_deco_4: "ฉากหลังสำหรับถ่ายภาพพร้อมโลโก้", pkg_b_deco_5: "ฉากหลังเวทีพร้อมโลโก้", pkg_b_deco_6: "ป้ายต้อนรับบ่าวสาว 1 ป้าย", pkg_b_deco_7: "ดอกไม้ตกแต่งโต๊ะอาหาร 4 ชุด", pkg_b_deco_8: "ดอกไม้ตกแต่งโต๊ะเค้ก หรือโต๊ะรินแชมเปญ", pkg_c_recommended: "แนะนำ", package_c_title: "⭐ PACKAGE C : THE TOTAL LOOK", package_c_subtitle: "แพ็กเกจครบวงจรพร้อมทีม Organizer และการตกแต่งสไตล์ VARAVELA", pkg_c_zone_req: "เฉพาะโซน LARGE", pkg_c_price_label: "ราคา", pkg_c_price: "290,000.-", pkg_c_space_label: "พื้นที่", pkg_c_space: "All Area", pkg_c_duration_label: "ระยะเวลา", pkg_c_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_c_deco_7: "ดอกไม้ตกแต่งโต๊ะอาหาร 6 ชุด", pkg_c_organizer_title: "Organizer & Service", pkg_c_org_1: "ทีมดูแลลำดับงาน (Run Que Team)", package_d_title: "PACKAGE D : THE ELEGANCE", package_d_subtitle: "แพ็กเกจครบวงจรเริ่มต้นพร้อมทีม Organizer และการตกแต่งสไตล์ไข่แดง", pkg_d_zone_req: "เฉพาะโซน LARGE", pkg_d_price_label: "ราคา", pkg_d_price: "340,000.-", pkg_d_space_label: "พื้นที่", pkg_d_space: "All Area", pkg_d_duration_label: "ระยะเวลา", pkg_d_duration: "06.00 - 13.30 / 16.00 - 22.00", package_e_title: "PACKAGE E : THE PRESTIGE", package_e_subtitle: "แพ็กเกจครบวงจรและสมบูรณ์แบบที่สุดพร้อมการตกแต่งสไตล์ไข่แดง", pkg_e_zone_req: "เฉพาะโซน LARGE", pkg_e_price_label: "ราคา", pkg_e_price: "420,000.-", pkg_e_space_label: "พื้นที่", pkg_e_space: "All Area", pkg_e_duration_label: "ระยะเวลา", pkg_e_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_e_deco_gallery: "Gallery", pkg_e_deco_dining_table: "ดอกไม้ตกแต่งโต๊ะอาหาร 8 ชุด", pkg_e_org_mc: "พิธีกร (Master of Ceremony)", section_event_info_title: "กรอกข้อมูลการจัดงาน", section_food_bev_title: "อาหารและเครื่องดื่ม", section_wedding_addons_title: "บริการเสริม", break_title: "BREAKS", lunch_dinner_title: "LUNCH / DINNER", liquor_title: "LIQUOR", liquor_singha_title: "Singha", liquor_singha_subtitle: "เบียร์สด 30 ลิตร (ประมาณ 70 แก้ว)", liquor_asahi_title: "Asahi", liquor_asahi_subtitle: "เบียร์สด 30 ลิตร (ประมาณ 70 แก้ว)", food_breakfast_title: "Breakfast Bar", food_breakfast_subtitle: "สำหรับ 50 ท่าน", food_coffee_break_title: "Afternoon Coffee Break", food_coffee_break_subtitle: "สำหรับ 50 ท่าน", food_buffet_standard_title: "Standard Buffet", food_buffet_standard_subtitle: "9 รายการ [อาหาร 6 อย่าง, 1 ของหวาน, 1 ข้าวสวย, 1 ผลไม้และเครื่องดื่ม] (ขั้นต่ำ 100 ท่าน)", food_buffet_inter_title: "International Buffet", food_buffet_inter_subtitle: "10 รายการ [อาหาร 6 อย่าง, 1 อาหารเคียง, 1 ของหวาน, 1 ข้าวสวย, 1 ผลไม้และเครื่องดื่ม] (ขั้นต่ำ 100 ท่าน)", food_cocktail_title: "Cocktail", food_cocktail_subtitle: "6 รายการ / 3 Food Station (ขั้นต่ำ 100 ท่าน)", food_chinese_sup_title: "Chinese Set Superior", food_chinese_sup_subtitle: "15,500 / 10 ท่าน (ขั้นต่ำ 100 ท่าน)", food_chinese_deluxe_title: "Chinese Set Deluxe", food_chinese_deluxe_subtitle: "20,000 / 10 ท่าน (ขั้นต่ำ 100 ท่าน)", food_individual_title: "Individual Serve", food_individual_subtitle: "5 Courses (ขั้นต่ำ 100 ท่าน)", food_wood_bkk_title: "Varavela X Wood BKK", food_wood_bkk_subtitle: "Serving 3 Set on Table (สำหรับ 20 ท่าน)", food_wood_bkk_note: "เพิ่มท่านละ 2,250", food_individual_2c_title: "Individual Serve 2 Course", food_individual_2c_subtitle: "Create By Chef (Main course & Dessert) (สำหรับ 20 ท่าน)", food_individual_2c_note: "เพิ่มท่านละ 3,000", per_person: "ท่าน", section5_subtitle_custom: "บริการเพิ่มเติมเพื่อเติมเต็มวันพิเศษของคุณ", unit_bottle: "ขวด", unit_barrel: "ถัง", unit_station: "Station", unit_function: "Function", addon_phan_khan_mak: "ชุดขันหมาก 9 อย่าง (พิธีไทย)", addon_beer_gallery: "ซุ้มเบียร์", addon_run_queue: "ทีมรันคิว", addon_mc: "พิธีกร", addon_donut_tower: "ชุดตกแต่งหอโดนัท พร้อมหอโดนัท 1 ชุด", addon_water_pouring: "ชุดพิธีหลั่งน้ำพระพุทธมนต์", addon_monk_food: "ภัตตาหารสำหรับพระสงฆ์ (เริ่มต้น 9 รูป)", addon_bring_in_floral: "ค่านำเข้าทีมตกแต่งดอกไม้", addon_wedding_cake: "เค้กแต่งงาน (3 ชั้น)", addon_extra_hour: "Extra hour", addon_extra_hour_price_unit: "15,000บาท/ชม.", summary_extra_hours_unit_wedding: "ชม.", addon_dropdown_label: "เพิ่มบริการเสริม", add_btn: "เพิ่ม", select_addon_placeholder: "เลือกบริการ...", section_studio_title: "เลือกประเภทการถ่ายทำ", personal_shooting_title: "Personal Shooting", personal_shooting_subtitle: "สำหรับ Pre-Wedding & ถ่ายภาพครอบครัว", commercial_shooting_title: "Commercial Shooting", commercial_shooting_subtitle: "สำหรับรายการทีวี, ภาพยนตร์, แฟชั่นและงานโฆษณา", zone_label: "พื้นที่:", all_area_except_bar: "ทุกโซน", conditions_label: "เงื่อนไข:", personal_conditions: "จำกัด 10 ท่าน", security_fee_label: "ค่าประกัน:", personal_security_fee: "฿10,000 (ได้รับคืน)", commercial_security_fee: "฿20,000 (ได้รับคืน)", extra_hours_label: "ชั่วโมงทำงานล่วงเวลา (฿5,000 / ชม.)", facility_title: "สิ่งอำนวยความสะดวกและอุปกรณ์", facility_1: "เก้าอี้พลาสติก 20 ตัว", facility_2: "โต๊ะสี่เหลี่ยม 10 ตัว", facility_3: "Power Plug 32A (220 / 250v) 1 จุด", facility_4: "Power Plug 16A (220 / 250v) 1 จุด", vat_notice: "** ราคานี้ยังไม่รวม VAT 7%", setup_time_notice: "** ราคานี้รวมเวลา Set up ล่วงหน้า 6 ชั่วโมง เท่านั้น", summary_title: "สรุปรายการ", summary_placeholder: "กรุณาเลือกแพ็คเกจเพื่อดูสรุปราคา", summary_total: "ราคารวมโดยประมาณ", summary_included: "รวมในแพ็คเกจ", summary_package: "สรุปรายการ", summary_vat_notice: "(ราคายังไม่รวม VAT 7%)", summary_full_day_surcharge: "ค่าบริการเต็มวัน (เพิ่มเติม)", back_btn: "ย้อนกลับ", next_btn: "ถัดไป", get_quote_btn: "ส่งข้อมูล", finish_calculation_btn: "เสร็จสิ้นการคำนวน", final_summary_title: "สรุปการคำนวณ", final_summary_subtitle: "สรุปรายละเอียดรายการที่คุณเลือก", submitted_btn: "ส่งข้อมูลแล้ว", save_image_btn: "บันทึกเป็นรูปภาพ", go_back_btn: "กลับไปแก้ไข", start_over_btn: "เริ่มคำนวนใหม่", modal_title: "รับข้อเสนอและโปรโมชั่นสุดพิเศษ", modal_subtitle: "กรอกข้อมูลเพื่อให้ทีมงานส่งใบเสนอราคาและโปรโมชั่นให้คุณ (ไม่บังคับ)", email_label: "อีเมล", phone_label: "เบอร์โทรศัพท์", line_label: "Line ID", email_placeholder: "example@email.com", phone_placeholder: "812345678", line_placeholder: "lineid", event_date_label: "ระบุวันจัดงาน", special_request_label: "Special Request", special_request_placeholder: "กรอกความต้องการของท่านเพื่อให้ทีมงานสามารถบริการท่านได้อย่างสมบูรณ์แบบที่สุด", submit_btn: "ส่งข้อมูล", sending_text: "กำลังส่งข้อมูล...", thanks_title: "ส่งข้อมูลสำเร็จ!", thanks_subtitle: "เราได้รับข้อมูลการคำนวณของคุณแล้ว ทีมงานจะติดต่อกลับไปพร้อมข้อเสนอพิเศษโดยเร็วที่สุดค่ะ", summary_venue_rental: "ค่าเช่าสถานที่", summary_addons: "บริการเสริม", summary_studio_rental: "ค่าเช่าสตูดิโอ", summary_studio_extra_hours: "ค่าล่วงเวลา", summary_studio_hours_unit: "ชม." },
    en: { main_title: "Calculate Your Event Price", main_subtitle: "Plan the budget for your special day in just a few steps.", section1_title: "Select Usage Type", wedding_package_title: "Wedding Package", wedding_package_subtitle: "Ready-made wedding packages", event_package_title: "Event Package", event_package_subtitle: "For banquets / custom packages", studio_package_title: "Studio Package", studio_package_subtitle: "For studio rental", section_zone_title: "Select Event Zone", zone_small_title: "SMALL", zone_small_subtitle: "THE HOME BAR & TERRACE", zone_small_guests: "30 - 50 Guests", zone_medium_title: "MEDIUM", zone_medium_subtitle: "HALF AREA / HALL ZONE", zone_medium_guests: "51 - 100 Guests", zone_large_title: "LARGE", zone_large_subtitle: "ALL AREA", zone_large_guests: "100 - 300 Guests", section3_title: "Enter Basic Information", guests_label: "Number of Guests", time_label: "Time Slot", venue_morning: "Morning Half-Day (8.00 - 15.00)", venue_evening: "Evening Half-Day (15.00 - 22.00)", venue_full_day: "Full Day (6.00 - 22.00)", section_package_choice_title: "Select Package", package_a_title: "PACKAGE A : THE VENUE", package_a_subtitle: "The venue package is designed for those who want to co-create your special day.", pkg_a_zone_req: "Only for LARGE zone", pkg_a_price_label: "Price", pkg_a_price: "150,000.-", pkg_a_space_label: "Space", pkg_a_space: "All Area", pkg_a_duration_label: "Duration", pkg_a_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_a_facilities_title: "Venue Facilities & Amenities", pkg_a_fac_1: "Sofa Set, Tea table & Carpet", pkg_a_fac_2: "200 Units of Chiavari Chair & 20 Units of High Stool tables", pkg_a_fac_3: "Standard Sound System & 4 Microphones", pkg_a_fac_4: "Standard Equipment for Monk Blessing Ceremony", pkg_a_fac_5: "10 Units of Tripod Gallery", pkg_a_fac_6: "Tea Set", pkg_a_deco_title: "The Venue Decoration Set", pkg_a_deco_note: "(or customers can bring in Outside Decoration)", pkg_a_deco_1: "1 Unit of Bridal Bouquet", pkg_a_deco_2: "6 Units of Corsages", pkg_a_deco_3: "Reception Set", pkg_a_deco_4: "1 Unit of Bride & Groom Welcome Signage", pkg_a_deco_5: "Standard Flower Stand", package_b_title: "PACKAGE B : THE FINEST", package_b_subtitle: "The Finest package is designed for those who seek easy.", pkg_b_zone_req: "Only for LARGE zone", pkg_b_price_label: "Price", pkg_b_price: "220,000.-", pkg_b_space_label: "Space", pkg_b_space: "All Area", pkg_b_duration_label: "Duration", pkg_b_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_b_facilities_title: "Venue Facilities & Amenities", pkg_b_fac_from_a: "Includes facilities from The Venue Package", pkg_b_fac_plus_1: "1 Unit of Light Shading or Strip Light", pkg_b_fac_plus_2: "Flower Architrave at Duet Patio", pkg_b_deco_title: "The Finest Decoration", pkg_b_deco_1: "1 Unit of Bridal Bouquet", pkg_b_deco_2: "6 Units of Corsages", pkg_b_deco_3: "Reception Set", pkg_b_deco_4: "Photo Backdrop with Logo", pkg_b_deco_5: "Stage Backdrop with Logo", pkg_b_deco_6: "1 Unit of Bride & Groom Welcome Signage", pkg_b_deco_7: "4 Units of Flower Decoration on Dining Table", pkg_b_deco_8: "1 Set of Decoration for Cake Table or Champagne Tower", pkg_c_recommended: "Recommended", package_c_title: "⭐ PACKAGE C : THE TOTAL LOOK", package_c_subtitle: "The Total Look package is designed for those who wants to have VARAVELA decoration style with a full service of organizer.", pkg_c_zone_req: "Only for LARGE zone", pkg_c_price_label: "Price", pkg_c_price: "290,000.-", pkg_c_space_label: "Space", pkg_c_space: "All Area", pkg_c_duration_label: "Duration", pkg_c_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_c_deco_7: "6 Units of Flower Decoration on Dining Table", pkg_c_organizer_title: "Organizer & Service", pkg_c_org_1: "Run Que Team", package_d_title: "PACKAGE D : THE ELEGANCE", package_d_subtitle: "VARAVELA X KAIDANG - The Elegance is the collaboration between KAIDANG Design and VARAVELA.", pkg_d_zone_req: "Only for LARGE zone", pkg_d_price_label: "Price", pkg_d_price: "340,000.-", pkg_d_space_label: "Space", pkg_d_space: "All Area", pkg_d_duration_label: "Duration", pkg_d_duration: "06.00 - 13.30 / 16.00 - 22.00", package_e_title: "PACKAGE E : THE PRESTIGE", package_e_subtitle: "The Prestige is the supreme collaboration between KAIDANG Design and VARAVELA.", pkg_e_zone_req: "Only for LARGE zone", pkg_e_price_label: "Price", pkg_e_price: "420,000.-", pkg_e_space_label: "Space", pkg_e_space: "All Area", pkg_e_duration_label: "Duration", pkg_e_duration: "06.00 - 13.30 / 16.00 - 22.00", pkg_e_deco_gallery: "Gallery", pkg_e_deco_dining_table: "8 Units of Flower Decoration on Dining Table", pkg_e_org_mc: "Master of Ceremony", section_event_info_title: "Enter Event Details", section_food_bev_title: "Food & Beverage", section_wedding_addons_title: "Special Services", break_title: "BREAKS", lunch_dinner_title: "LUNCH / DINNER", liquor_title: "LIQUOR", liquor_singha_title: "Singha", liquor_singha_subtitle: "Draught Beer 30 Liters (Approx. 70 glasses)", liquor_asahi_title: "Asahi", liquor_asahi_subtitle: "Draught Beer 30 Liters (Approx. 70 glasses)", food_breakfast_title: "Breakfast Bar", food_breakfast_subtitle: "For 50 Pax", food_coffee_break_title: "Afternoon Coffee Break", food_coffee_break_subtitle: "For 50 Pax", food_buffet_standard_title: "Standard Buffet", food_buffet_standard_subtitle: "9 Items [Standard 6 / Dessert 1 / Fruit 1 / Jasmine Rice 1 / Drinking Water] (Minimum 100 Pax)", food_buffet_inter_title: "International Buffet", food_buffet_inter_subtitle: "10 Items [International 6 / Dessert 1 / Side Dish 1 / Fruit 1 / Jasmine Rice 1 / Drinking Water] (Minimum 100 Pax)", food_cocktail_title: "Cocktail", food_cocktail_subtitle: "6 Items / 3 Food Stations (Minimum 100 Pax)", food_chinese_sup_title: "Chinese Set Superior", food_chinese_sup_subtitle: "15,500 / 10 Persons (Minimum 100 Pax)", food_chinese_deluxe_title: "Chinese Set Deluxe", food_chinese_deluxe_subtitle: "20,000 / 10 Persons (Minimum 100 Pax)", food_individual_title: "Individual Serve", food_individual_subtitle: "5 Courses (Minimum 80 Pax)", food_wood_bkk_title: "Varavela X Wood BKK", food_wood_bkk_subtitle: "Serving 3 Set on Table (For 20 Pax)", food_wood_bkk_note: "Add 2,250 per additional person", food_individual_2c_title: "Individual Serve 2 Course", food_individual_2c_subtitle: "Create By Chef (Main course & Dessert) (For 20 Pax)", food_individual_2c_note: "Add 3,000 per additional person", per_person: "person", section5_subtitle_custom: "To add the full flavor to your wedding, we also provide an additional services to fulfill special days.", unit_bottle: "Bottle(s)", unit_barrel: "Barrel(s)", unit_station: "Station(s)", unit_function: "Function(s)", addon_phan_khan_mak: "9 Phan Khan Mak (Thai Ceremony)", addon_beer_gallery: "Beer Gallery", addon_run_queue: "Run Queue Team", addon_mc: "MC (Master of Ceremony)", addon_donut_tower: "Decoration for Donut Tower + 1 Set Donut Tower", addon_water_pouring: "Holy Water Pouring Set (Starts from)", addon_monk_food: "Food for Monk Ceremony (Starts from 9 Monks)", addon_bring_in_floral: "Bring in non-VARAVELA partner outsource Floral Decoration", addon_wedding_cake: "Wedding Cake (3-Tier, Starting at)", addon_extra_hour: "Extra hour", addon_extra_hour_price_unit: "15,000 THB/hr", summary_extra_hours_unit_wedding: "hr(s)", addon_dropdown_label: "Add Special Service", add_btn: "Add", select_addon_placeholder: "Select a service...", section_studio_title: "Select Shooting Type", personal_shooting_title: "Personal Shooting", personal_shooting_subtitle: "For Pre-Wedding & Family Portrait", commercial_shooting_title: "Commercial Shooting", commercial_shooting_subtitle: "For TV Program, Filmography, Fashion", zone_label: "Zone:", all_area_except_bar: "All Area (Except Bar Zone)", conditions_label: "Conditions:", personal_conditions: "Limited to 10 guests", security_fee_label: "Security Fee:", personal_security_fee: "฿10,000 (reimbursed)", commercial_security_fee: "฿20,000 (reimbursed)", extra_hours_label: "Extra Hours (฿5,000 / hr)", facility_title: "Facility & Equipment", facility_1: "Plastic Chair 20 Units", facility_2: "Oblong Table 10 Units", facility_3: "Power Plug 32A (220 / 250v) 1 Unit", facility_4: "Power Plug 16A (220 / 250v) 1 Unit", vat_notice: "** This price is subject to 7% VAT", setup_time_notice: "** This price includes 6 hours of setup time in advance only", summary_title: "Summary", summary_placeholder: "Please select a package to see the price summary.", summary_total: "Estimated Total Price", summary_included: "Included", summary_package: "Summary", summary_vat_notice: "(Excludes 7% VAT)", summary_full_day_surcharge: "Full Day Surcharge", back_btn: "Back", next_btn: "Next", get_quote_btn: "Get a Special Offer", finish_calculation_btn: "Finish Calculation", final_summary_title: "Calculation Summary", final_summary_subtitle: "Here is the summary of your selected items.", submitted_btn: "Submitted", save_image_btn: "Save as Image", go_back_btn: "Go Back to Edit", start_over_btn: "Start Over", modal_title: "Get a Special Offer!", modal_subtitle: "Fill in your details for a quote and promotions (optional).", email_label: "Email", phone_label: "Phone Number", line_label: "Line ID", email_placeholder: "example@email.com", phone_placeholder: "812345678", line_placeholder: "lineid", event_date_label: "Event Date", special_request_label: "Special Request", special_request_placeholder: "Additional details", submit_btn: "Submit", sending_text: "Sending...", thanks_title: "Submission Successful!", thanks_subtitle: "We've received your calculation. Our team will contact you with a special offer shortly.", summary_venue_rental: "Venue Rental", summary_addons: "Special Services", summary_studio_rental: "Studio Rental", summary_studio_extra_hours: "Extra Hours", summary_studio_hours_unit: "hr(s)" }
};

const addonData = [
    { key: 'addon_phan_khan_mak' }, { key: 'addon_beer_gallery' }, { key: 'addon_run_queue' },
    { key: 'addon_donut_tower' }, { key: 'addon_water_pouring' }, { key: 'addon_monk_food' },
    { key: 'addon_bring_in_floral' }, { key: 'addon_wedding_cake' }, { key: 'addon_mc' },
    { key: 'addon_extra_hour' }
];

const countryCodes = [
    { code: "+66", name: "TH" }, { code: "+1", name: "USA" }, { code: "+44", name: "UK" },
    { code: "+81", name: "JP" }, { code: "+86", name: "CN" }, { code: "+852", name: "HK" },
    { code: "+65", name: "SG" },
];

// --- Helper Function ---
const formatCurrency = (amount) => new Intl.NumberFormat('th-TH').format(amount);
const isMetaBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf("Instagram") > -1);
};


// The main React component
export default function App() {
    // --- State Management ---
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('calculator'); // 'calculator' or 'summary'
    const [currentLang, setCurrentLang] = useState('th');
    const [currentStep, setCurrentStep] = useState(0);

    const [packageType, setPackageType] = useState(null);
    const [zone, setZone] = useState(null);
    const [zoneData, setZoneData] = useState({});
    const [guests, setGuests] = useState(0);
    const [venueKey, setVenueKey] = useState('');
    const [venuePrice, setVenuePrice] = useState(0);

    const [packageChoice, setPackageChoice] = useState(null);
    const [expandedPackage, setExpandedPackage] = useState(null);

    const [foodAndBev, setFoodAndBev] = useState({
        breaks: null, // single key
        lunchDinner: null, // single key
        beverages: {}, // { key: quantity }
    });

    const [studioChoice, setStudioChoice] = useState(null);
    const [studioPrice, setStudioPrice] = useState(0);
    const [studioExtraHours, setStudioExtraHours] = useState(0);
    const [expandedStudio, setExpandedStudio] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSavingImage, setIsSavingImage] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        countryCode: '+66',
        phone: '',
        lineId: '',
        eventDate: '',
        specialRequest: '',
        addons: [],
    });

    // --- Memoized Values & Derived State ---
    const T = useMemo(() => translations[currentLang], [currentLang]);
    
    const flow = useMemo(() => {
        const flows = {
            wedding: ['packageType', 'packageChoice', 'basicInfo', 'food'],
            event: ['packageType', 'zone', 'basicInfo', 'food'],
            studio: ['packageType', 'shootingType'],
        };
        return flows[packageType] || ['packageType'];
    }, [packageType]);

    const isStepValid = useMemo(() => {
        const currentStepId = flow[currentStep];
        switch (currentStepId) {
            case 'packageType': return !!packageType;
            case 'zone': return !!zone;
            case 'basicInfo': return !!venueKey && guests > 0;
            case 'packageChoice': return !!packageChoice;
            case 'shootingType': return !!studioChoice;
            default: return true;
        }
    }, [flow, currentStep, packageType, zone, venueKey, guests, packageChoice, studioChoice]);

    const totalCalculation = useMemo(() => {
        let total = 0;
        let summaryItems = [];

        if (packageType === 'wedding') {
            if (packageChoice) {
                const pkg = weddingPackages.find(p => p.key === packageChoice);
                if (pkg) {
                    total += pkg.price;
                    summaryItems.push({ label: `${T.summary_package} (${T[pkg.titleKey]})`, value: pkg.price });
                }
            }
            if (venueKey === 'venue_full_day') {
                const surcharge = 100000;
                total += surcharge;
                summaryItems.push({ label: T.summary_full_day_surcharge, value: surcharge });
            }

            let foodTotal = 0;
            let foodDetails = [];

            if (foodAndBev.breaks) {
                const item = foodOptionsMedLarge.breaks.find(b => b.key === foodAndBev.breaks);
                if (item) {
                    const itemTotal = item.pricing === 'flat' ? item.price : item.price * guests;
                    foodTotal += itemTotal;
                    foodDetails.push({ label: `${T[item.titleKey]} ${item.pricing !== 'flat' ? `(x${guests})` : ''}`, value: itemTotal });
                }
            }

            if (foodAndBev.lunchDinner) {
                 const allLunchDinner = [...foodOptionsSmall.lunchDinner, ...foodOptionsMedLarge.lunchDinner];
                 const item = allLunchDinner.find(ld => ld.key === foodAndBev.lunchDinner);
                 if(item) {
                     let itemTotal = 0;
                     if(item.basePax) { // Small zone logic
                        itemTotal = item.price;
                        if(guests > item.basePax) {
                            itemTotal += (guests - item.basePax) * item.extraPrice;
                        }
                     } else { // Med/Large logic
                        itemTotal = item.price * guests;
                     }
                     foodTotal += itemTotal;
                     foodDetails.push({ label: `${T[item.titleKey]} (x${guests})`, value: itemTotal });
                 }
            }

            Object.entries(foodAndBev.beverages).forEach(([key, quantity]) => {
                if (quantity > 0) {
                    const item = foodOptionsMedLarge.beverages.find(b => b.key === key);
                    if (item) {
                        const itemTotal = item.price * quantity;
                        foodTotal += itemTotal;
                        foodDetails.push({ label: `${T[item.titleKey]} (x${quantity} ${T[item.unitKey]})`, value: itemTotal });
                    }
                }
            });

            if (foodTotal > 0) {
                summaryItems.push({ label: T.section_food_bev_title, value: foodTotal, details: foodDetails });
            }
            total += foodTotal;

        } else if (packageType === 'event') {
            if (venuePrice > 0) {
                total += venuePrice;
                summaryItems.push({ label: `${T.summary_venue_rental} (${T['zone_'+zone+'_title']})`, value: venuePrice });
            }
             let foodTotal = 0;
             let foodDetails = [];
             // ... [Identical food calculation logic as 'wedding' event] ...
             if (foodAndBev.breaks) {
                const item = foodOptionsMedLarge.breaks.find(b => b.key === foodAndBev.breaks);
                if (item) {
                    const itemTotal = item.pricing === 'flat' ? item.price : item.price * guests;
                    foodTotal += itemTotal;
                    foodDetails.push({ label: `${T[item.titleKey]} ${item.pricing !== 'flat' ? `(x${guests})` : ''}`, value: itemTotal });
                }
            }

            if (foodAndBev.lunchDinner) {
                 const allLunchDinner = [...foodOptionsSmall.lunchDinner, ...foodOptionsMedLarge.lunchDinner];
                 const item = allLunchDinner.find(ld => ld.key === foodAndBev.lunchDinner);
                 if(item) {
                     let itemTotal = 0;
                     if(item.basePax) { // Small zone logic
                        itemTotal = item.price;
                        if(guests > item.basePax) {
                            itemTotal += (guests - item.basePax) * item.extraPrice;
                        }
                     } else { // Med/Large logic
                        itemTotal = item.price * guests;
                     }
                     foodTotal += itemTotal;
                     foodDetails.push({ label: `${T[item.titleKey]} (x${guests})`, value: itemTotal });
                 }
            }

            Object.entries(foodAndBev.beverages).forEach(([key, quantity]) => {
                if (quantity > 0) {
                    const item = foodOptionsMedLarge.beverages.find(b => b.key === key);
                    if (item) {
                        const itemTotal = item.price * quantity;
                        foodTotal += itemTotal;
                        foodDetails.push({ label: `${T[item.titleKey]} (x${quantity} ${T[item.unitKey]})`, value: itemTotal });
                    }
                }
            });

             if (foodTotal > 0) {
                 summaryItems.push({ label: T.section_food_bev_title, value: foodTotal, details: foodDetails });
             }
             total += foodTotal;

        } else if (packageType === 'studio') {
            if (studioPrice > 0) {
                total += studioPrice;
                const pkg = studioPackages.find(p => p.key === studioChoice);
                summaryItems.push({ label: `${T.summary_studio_rental} (${T[pkg.titleKey]})`, value: studioPrice });
                if (studioExtraHours > 0) {
                    const extraCost = studioExtraHours * 5000;
                    total += extraCost;
                    summaryItems.push({ label: `${T.summary_studio_extra_hours} (${studioExtraHours} ${T.summary_studio_hours_unit})`, value: extraCost, isSubItem: true });
                }
            }
        }
        
        return { total, summaryItems };

    }, [packageType, packageChoice, venueKey, guests, foodAndBev, venuePrice, zone, studioChoice, studioPrice, studioExtraHours, T]);
    
    // --- Effects ---
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Dynamically load the html2canvas script
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.async = true;
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    useEffect(() => {
        document.documentElement.lang = currentLang;
    }, [currentLang]);


    // --- Handlers ---
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            setCurrentStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setView('summary');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const resetCalculator = useCallback(() => {
        setView('calculator');
        setCurrentStep(0);
        setPackageType(null);
        setZone(null);
        setZoneData({});
        setGuests(0);
        setVenueKey('');
        setVenuePrice(0);
        setPackageChoice(null);
        setExpandedPackage(null);
        setFoodAndBev({ breaks: null, lunchDinner: null, beverages: {} });
        setStudioChoice(null);
        setStudioPrice(0);
        setStudioExtraHours(0);
        setExpandedStudio(null);
        setIsModalOpen(false);
        setIsSubmitting(false);
        setIsSubmitted(false);
         setFormData(prev => ({ ...prev,
            email: '', phone: '', lineId: '', eventDate: '', specialRequest: '', addons: [],
        }));
    }, []);

    const handlePackageTypeSelect = (type) => {
        const lang = currentLang;
        resetCalculator();
        setCurrentLang(lang);
        setPackageType(type);
        setTimeout(() => setCurrentStep(1), 100);
    };
    
    const handleZoneSelect = (selectedZoneData) => {
        setZone(selectedZoneData.zone);
        setZoneData(selectedZoneData);
        setGuests(selectedZoneData.minGuests);

        if(packageType === 'event'){
            setVenueKey('venue_full_day');
            setVenuePrice(parseInt(selectedZoneData.priceAllday));
        } else { // wedding
            setVenueKey('venue_morning');
            setVenuePrice(0); // Price is in package
        }
    };

    const handlePackageChoiceSelect = (key) => {
        const newPackage = key === packageChoice ? null : key;
        setPackageChoice(newPackage);
        setExpandedPackage(newPackage);
        if (newPackage) {
            const largeZone = zones.find(z => z.zone === 'large');
            handleZoneSelect(largeZone);
        } else {
            setZone(null);
            setZoneData({});
        }
    };
    
    const handleStudioSelect = (key) => {
        const newChoice = key === studioChoice ? null : key;
        setStudioChoice(newChoice);
        setExpandedStudio(newChoice);
        if (newChoice) {
            const pkg = studioPackages.find(p => p.key === newChoice);
            setStudioPrice(pkg.price);
        } else {
            setStudioPrice(0);
        }
        setStudioExtraHours(0);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                addons: checked
                    ? [...prev.addons, value]
                    : prev.addons.filter(item => item !== value),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4ydP9YC55v758cUwOBwQe6bi3HSlwKDqzqunusYoVG9l2ZuK3-iQT-TWIFsuKIoTG/exec';
        if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE')) {
             alert('This is a demo. Data will not be sent.');
             setIsModalOpen(false);
             setIsSubmitted(true);
             return;
        }

        setIsSubmitting(true);
        const gFormData = new FormData();

        const { total } = totalCalculation;

        let eventDetailsForEmail = '';
        let foodTextForSheet = 'N/A';

        if (packageType === 'studio') {
             eventDetailsForEmail = `
Event date: ${formData.eventDate || '(Not specified)'}
Package type: ${packageType}
Shooting type: ${studioChoice ? T[studioPackages.find(p=>p.key === studioChoice).titleKey] : 'N/A'}
Extra hours: ${studioExtraHours}
`;
        } else {
             let tempFoodText = '';
             if (foodAndBev.breaks) tempFoodText += `${T[foodOptionsMedLarge.breaks.find(b=>b.key===foodAndBev.breaks).titleKey]}, `;
             if (foodAndBev.lunchDinner) {
                const allLunchDinner = [...foodOptionsSmall.lunchDinner, ...foodOptionsMedLarge.lunchDinner];
                tempFoodText += `${T[allLunchDinner.find(ld => ld.key === foodAndBev.lunchDinner).titleKey]}, `;
             }
             Object.entries(foodAndBev.beverages).forEach(([key, quantity]) => {
                if (quantity > 0) tempFoodText += `${T[foodOptionsMedLarge.beverages.find(b=>b.key===key).titleKey]} x${quantity}, `;
             });
             if (tempFoodText) foodTextForSheet = tempFoodText.slice(0, -2);

             eventDetailsForEmail = `
Event date: ${formData.eventDate || '(Not specified)'}
Venue time: ${venueKey ? T[venueKey] : 'N/A'}
Zone: ${zone ? T['zone_'+zone+'_title'] + ' Zone' : 'N/A'}
Guests: ${guests}
Package type: ${packageType}
Package choice: ${packageChoice ? T[weddingPackages.find(p=>p.key === packageChoice).titleKey] : 'N/A'}
Food: ${foodTextForSheet}
`;
        }
        
        const addonsTextForEmail = formData.addons.length > 0
            ? `\n🎁 บริการเสริม (Add-ons / Extra Services)\n\n${formData.addons.map(a => `- ${a}`).join('\n')}\n`
            : '';

        const emailBody = `📝 New Varavela Calculator Submission
📅 Event Details
${eventDetailsForEmail}
${addonsTextForEmail}
🗣 Special Request

${formData.specialRequest || '(None)'}

💰 Total Price

฿${formatCurrency(total)}

📩 Contact Information

Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}
Line ID: ${formData.lineId || '(Not specified)'}

🕒 Timestamp

${new Date().toLocaleString('en-GB')}
`;

        gFormData.append('timestamp', new Date().toLocaleString('en-GB'));
        gFormData.append('email', formData.email);
        gFormData.append('phone', `'${formData.countryCode} ${formData.phone}`);
        gFormData.append('line_id', formData.lineId || 'N/A');
        gFormData.append('event_date', formData.eventDate || 'N/A');
        gFormData.append('total_price', `฿${formatCurrency(total)}`);
        gFormData.append('package_type', packageType);

        if (packageType === 'studio') {
             gFormData.append('package_choice', studioChoice ? T[studioPackages.find(p=>p.key === studioChoice).titleKey] : 'N/A');
             gFormData.append('extra_hours', studioExtraHours);
        } else {
            gFormData.append('zone', zone ? T['zone_'+zone+'_title'] + ' Zone' : 'N/A');
            gFormData.append('guests', guests);
            gFormData.append('venue_time', venueKey ? T[venueKey] : 'N/A');
            gFormData.append('package_choice', packageChoice ? T[weddingPackages.find(p=>p.key === packageChoice).titleKey] : 'N/A');
            gFormData.append('food', foodTextForSheet);
            gFormData.append('addons', formData.addons.join(', ') || 'N/A');
        }
        gFormData.append('special_request', formData.specialRequest || 'N/A');
        gFormData.append('email_body', emailBody);

        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: gFormData })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsModalOpen(false);
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleSaveImage = () => {
        setIsSavingImage(true);
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        
        // Use a function to generate HTML string dynamically
        const quoteHtml = generateA4QuoteHtml(T, totalCalculation, formData, packageType, guests, venueKey, zone, studioChoice, studioExtraHours, packageChoice, foodAndBev);
        tempContainer.innerHTML = quoteHtml;
        document.body.appendChild(tempContainer);

        const captureNode = tempContainer.children[0];

        setTimeout(() => {
            window.html2canvas(captureNode, {
                useCORS: true,
                backgroundColor: '#ffffff',
                scale: isMetaBrowser() ? 1.5 : 2,
            }).then(canvas => {
                const imageUrl = canvas.toDataURL('image/png');
                const isMobile = /Mobi|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    const newWindow = window.open();
                    newWindow.document.write(`<body style="margin:0; text-align: center;"><img src="${imageUrl}" style="max-width: 100%;"><p>Long-press image to save.</p></body>`);
                } else {
                    const link = document.createElement('a');
                    link.download = 'VARAVELA-Quote-Summary.png';
                    link.href = imageUrl;
                    link.click();
                }
            }).catch(err => {
                console.error("Error generating image:", err);
                alert("Error generating image.");
            }).finally(() => {
                document.body.removeChild(tempContainer);
                setIsSavingImage(false);
            });
        }, 500);
    };

    // --- Render Logic ---
    if (isLoading) {
        return <SplashScreen />;
    }

    const renderStepContent = () => {
        const currentStepId = flow[currentStep];
        switch (currentStepId) {
            case 'packageType': return <StepPackageType onSelect={handlePackageTypeSelect} selected={packageType} T={T} />;
            case 'zone': return <StepZone onSelect={handleZoneSelect} selected={zone} T={T} />;
            case 'basicInfo': return <StepBasicInfo 
                                        guests={guests} setGuests={setGuests} 
                                        venueKey={venueKey} setVenueKey={setVenueKey}
                                        zoneData={zoneData}
                                        T={T} />;
            case 'packageChoice': return <StepPackageChoice 
                                            onSelect={handlePackageChoiceSelect} 
                                            selected={packageChoice}
                                            expanded={expandedPackage}
                                            setExpanded={setExpandedPackage}
                                            T={T} />;
            case 'food': return <StepFood 
                                    zone={zone}
                                    foodAndBev={foodAndBev}
                                    setFoodAndBev={setFoodAndBev}
                                    T={T} />;
            case 'shootingType': return <StepShootingType
                                            onSelect={handleStudioSelect}
                                            selected={studioChoice}
                                            expanded={expandedStudio}
                                            setExpanded={setExpandedStudio}
                                            extraHours={studioExtraHours}
                                            setExtraHours={setStudioExtraHours}
                                            T={T} />;
            default: return <div>Unknown Step</div>;
        }
    };

    return (
        <>
            <CustomStyles />
            {view === 'calculator' && (
                <div className="w-full max-w-6xl mx-auto elegant-card">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 p-6 md:p-10 flex flex-col">
                            <header className="flex flex-wrap gap-4 justify-between items-start">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{T.main_title}</h1>
                                    <p className="text-gray-500 mt-1">{T.main_subtitle}</p>
                                </div>
                                <div className="flex space-x-1 bg-white/50 backdrop-blur-sm p-1 rounded-lg z-10">
                                    <button onClick={() => setCurrentLang('th')} className={`lang-switcher ${currentLang === 'th' ? 'active' : ''}`}>TH</button>
                                    <button onClick={() => setCurrentLang('en')} className={`lang-switcher ${currentLang === 'en' ? 'active' : ''}`}>EN</button>
                                </div>
                            </header>

                            <div id="main-content">
                                <div className="my-8">
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill h-full" style={{ width: `${flow.length > 1 ? (currentStep / (flow.length - 1)) * 100 : 0}%` }}></div>
                                    </div>
                                </div>
                                <div className="steps-container flex-grow min-h-[500px] relative">
                                    {renderStepContent()}
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t flex justify-between items-center">
                                <button onClick={handleBack} className="btn-secondary font-semibold py-3 px-6 rounded-lg transition-opacity" style={{ opacity: currentStep > 0 ? 1 : 0, visibility: currentStep > 0 ? 'visible' : 'hidden' }}>{T.back_btn}</button>
                                <button onClick={handleNext} className="btn-primary font-semibold py-3 px-6 rounded-lg" disabled={!isStepValid}>
                                    {currentStep === flow.length - 1 ? T.finish_calculation_btn : T.next_btn}
                                </button>
                            </div>
                        </div>

                        {/* Summary Panel */}
                        <SummaryPanel T={T} calculation={totalCalculation} />
                    </div>
                </div>
            )}
            
            {view === 'summary' && (
                <ThankYouScreen 
                    T={T} 
                    calculation={totalCalculation} 
                    onGetQuote={() => setIsModalOpen(true)}
                    onGoBack={() => { setView('calculator'); setCurrentStep(flow.length - 1); }}
                    onStartOver={resetCalculator}
                    onSaveImage={handleSaveImage}
                    isSavingImage={isSavingImage}
                    isSubmitted={isSubmitted}
                />
            )}

            {isModalOpen && (
                 <ContactModal
                    T={T}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    handleFormChange={handleFormChange}
                    isSubmitting={isSubmitting}
                    showAddons={packageType === 'wedding'}
                />
            )}
        </>
    );
}

// --- Sub-components for each step and major UI part ---

const SummaryContent = ({ T, calculation }) => (
    <>
        <div>
            <h2 className="text-2xl font-semibold mb-6">{T.summary_title}</h2>
            <div className="space-y-3 text-gray-600">
                {calculation.summaryItems.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">{T.summary_placeholder}</p>
                ) : (
                    calculation.summaryItems.map((item, index) => (
                        <div key={index}>
                            <div className={`flex justify-between ${item.isSubItem ? 'pl-2 text-sm' : 'font-medium'}`}>
                                <span>{item.label}</span>
                                <span>฿{formatCurrency(item.value)}</span>
                            </div>
                            {item.details && item.details.map((detail, dIndex) => (
                                <div key={dIndex} className="flex justify-between pl-2 text-sm">
                                    <span>{detail.label}</span>
                                    <span>฿{formatCurrency(detail.value)}</span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="flex justify-between items-center text-xl font-bold">
                <span>{T.summary_total}</span>
                <span className="text-3xl text-[#a2674b]">฿{formatCurrency(calculation.total)}</span>
            </div>
            {calculation.total > 0 && (
                <p className="text-right text-xs text-gray-500 mt-1">{T.summary_vat_notice}</p>
            )}
        </div>
    </>
);

const SplashScreen = () => (
    <div id="splash-screen" className="fixed inset-0 bg-[#F9F6F3] z-[9999] flex items-center justify-center">
        <img src="https://i.postimg.cc/br5jzbTF/Asset-8-4x-8-0.png" alt="Varavela Logo" className="w-1/2 md:w-1/4" />
    </div>
);

const SummaryPanel = ({ T, calculation }) => (
     <div className="lg:col-span-1 summary-panel p-6 md:p-10 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen overflow-y-auto">
        <div className="flex flex-col justify-between h-full min-h-[500px]">
            <SummaryContent T={T} calculation={calculation} />
        </div>
    </div>
);

const StepPackageType = ({ onSelect, selected, T }) => (
    <div className="step active space-y-8">
        <h2 className="text-xl font-semibold mb-4">{T.section1_title}</h2>
        <div className="space-y-4">
            <div onClick={() => onSelect('wedding')} className={`option-card p-6 rounded-xl text-center ${selected === 'wedding' ? 'selected' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C0A080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.77-.77-.77a5.4 5.4 0 0 0-7.65 0C2.46 6.5 2 8.6 2 10.5c0 3.9 3.4 6.6 8.55 11.24l1.45 1.26 1.45-1.26C18.6 17.1 22 14.4 22 10.5c0-1.9-.46-4-2.58-5.92Z"></path></svg>
                <h3 className="font-semibold text-lg">{T.wedding_package_title}</h3>
                <p className="text-sm text-gray-500">{T.wedding_package_subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => onSelect('event')} className={`option-card p-6 rounded-xl text-center ${selected === 'event' ? 'selected' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C0A080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="m9 16 2 2 4-4"></path></svg>
                    <h3 className="font-semibold text-lg">{T.event_package_title}</h3>
                    <p className="text-sm text-gray-500">{T.event_package_subtitle}</p>
                </div>
                <div onClick={() => onSelect('studio')} className={`option-card p-6 rounded-xl text-center ${selected === 'studio' ? 'selected' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C0A080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                    <h3 className="font-semibold text-lg">{T.studio_package_title}</h3>
                    <p className="text-sm text-gray-500">{T.studio_package_subtitle}</p>
                </div>
            </div>
        </div>
    </div>
);

// ... Other Step Components (StepZone, StepBasicInfo, etc.) would be structured similarly ...
// To keep the file size manageable, I'll combine the logic into the main component where possible,
// but for a real app, breaking them out like this is best practice. Let's create the other components.

const zones = [
    { zone: 'small', minGuests: 30, maxGuests: 50, priceMorning: 25000, priceEvening: 25000, priceAllday: 40000, titleKey: 'zone_small_title', subtitleKey: 'zone_small_subtitle', guestsKey: 'zone_small_guests' },
    { zone: 'medium', minGuests: 51, maxGuests: 100, priceMorning: 50000, priceEvening: 50000, priceAllday: 70000, titleKey: 'zone_medium_title', subtitleKey: 'zone_medium_subtitle', guestsKey: 'zone_medium_guests' },
    { zone: 'large', minGuests: 100, maxGuests: 300, priceMorning: 75000, priceEvening: 75000, priceAllday: 120000, titleKey: 'zone_large_title', subtitleKey: 'zone_large_subtitle', guestsKey: 'zone_large_guests' },
];

const StepZone = ({ onSelect, selected, T }) => (
    <div className="step active space-y-8">
        <h2 className="text-xl font-semibold mb-4">{T.section_zone_title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {zones.map(z => (
                 <div key={z.zone} onClick={() => onSelect(z)} className={`option-card p-5 rounded-xl text-center ${selected === z.zone ? 'selected' : ''}`}>
                    <h3 className="font-semibold">{T[z.titleKey]}</h3>
                    <p className="text-sm text-gray-500">{T[z.subtitleKey]}</p>
                    <p className="font-bold mt-2 text-[#a2674b]">{T[z.guestsKey]}</p>
                 </div>
            ))}
        </div>
    </div>
);

const StepBasicInfo = ({ guests, setGuests, venueKey, setVenueKey, zoneData, T }) => {
    const handleGuestChange = (e) => {
        let value = parseInt(e.target.value) || 0;
        if (value > 300) value = 300;
        setGuests(value);
    };

    return (
        <div className="step active space-y-8">
            <h2 className="text-xl font-semibold mb-4">{T.section3_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="guests" className="block font-medium mb-2">
                        <span>{T.guests_label}</span>
                        {zoneData.minGuests && <span className="text-sm font-normal text-gray-500 ml-2">({zoneData.minGuests} - {zoneData.maxGuests})</span>}
                    </label>
                    <input type="number" id="guests" value={guests} onChange={handleGuestChange} max="300" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a2674b] focus:border-transparent transition" />
                </div>
                <div>
                    <label className="block font-medium mb-2">{T.time_label}</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                         <button onClick={() => setVenueKey('venue_morning')} className={`time-option flex-1 p-3 border rounded-lg transition text-sm ${venueKey === 'venue_morning' ? 'selected' : ''}`}>{T.venue_morning}</button>
                         <button onClick={() => setVenueKey('venue_evening')} className={`time-option flex-1 p-3 border rounded-lg transition text-sm ${venueKey === 'venue_evening' ? 'selected' : ''}`}>{T.venue_evening}</button>
                         <button onClick={() => setVenueKey('venue_full_day')} className={`time-option flex-1 p-3 border rounded-lg transition text-sm ${venueKey === 'venue_full_day' ? 'selected' : ''}`}>{T.venue_full_day}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... More components will follow
// Data for wedding packages
const weddingPackages = [
    { key: 'package_a', price: 150000, titleKey: 'package_a_title', subtitleKey: 'package_a_subtitle', recommended: false },
    { key: 'package_b', price: 220000, titleKey: 'package_b_title', subtitleKey: 'package_b_subtitle', recommended: false },
    { key: 'package_c', price: 290000, titleKey: 'package_c_title', subtitleKey: 'package_c_subtitle', recommended: true },
    { key: 'package_d', price: 340000, titleKey: 'package_d_title', subtitleKey: 'package_d_subtitle', recommended: false },
    { key: 'package_e', price: 420000, titleKey: 'package_e_title', subtitleKey: 'package_e_subtitle', recommended: false },
];
// This is a simplified version of the details for brevity
const PackageDetails = ({ T, pkgKey }) => (
    <div className="p-5 border-t bg-gray-50/50 space-y-4 text-sm">
        <p>{T[`${pkgKey}_subtitle`]}</p>
        <div className="grid grid-cols-3 gap-4">
            <div><strong>{T.pkg_a_price_label}</strong><br /><span>{T[`${pkgKey}_price`] || '-'}</span></div>
            <div><strong>{T.pkg_a_space_label}</strong><br /><span>{T.pkg_a_space}</span></div>
            <div><strong>{T.pkg_a_duration_label}</strong><br /><span>{T.pkg_a_duration}</span></div>
        </div>
    </div>
);


const StepPackageChoice = ({ onSelect, selected, expanded, setExpanded, T }) => (
    <div className="step active space-y-8">
        <h2 className="text-xl font-semibold mb-4">{T.section_package_choice_title}</h2>
        <div className="space-y-4">
            {weddingPackages.map(pkg => (
                <div key={pkg.key} onClick={() => onSelect(pkg.key)} className={`option-card rounded-xl overflow-hidden relative ${selected === pkg.key ? 'selected' : ''}`}>
                    {pkg.recommended && <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">{T.pkg_c_recommended}</div>}
                    <div className="p-5 cursor-pointer">
                        <h3 className="font-semibold pr-16">{T[pkg.titleKey]}</h3>
                        <p className="text-sm text-gray-500">{T[pkg.subtitleKey]}</p>
                    </div>
                    <div className="details-container" style={{ maxHeight: expanded === pkg.key ? '500px' : '0' }}>
                        <PackageDetails T={T} pkgKey={pkg.key} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Data for Food
const foodOptionsSmall = {
    lunchDinner: [
        { key: 'food_wood_bkk', price: 20000, extraPrice: 2250, basePax: 20, titleKey: 'food_wood_bkk_title', subtitleKey: 'food_wood_bkk_subtitle', noteKey: 'food_wood_bkk_note' },
        { key: 'food_individual_2c', price: 24000, extraPrice: 3000, basePax: 20, titleKey: 'food_individual_2c_title', subtitleKey: 'food_individual_2c_subtitle', noteKey: 'food_individual_2c_note' },
    ]
};
const foodOptionsMedLarge = {
    breaks: [
        { key: 'food_breakfast', price: 25000, pricing: 'flat', titleKey: 'food_breakfast_title' },
        { key: 'food_coffee_break', price: 25000, pricing: 'flat', titleKey: 'food_coffee_break_title' },
    ],
    lunchDinner: [
        { key: 'food_buffet_standard', price: 950, titleKey: 'food_buffet_standard_title' },
        { key: 'food_buffet_inter', price: 1100, titleKey: 'food_buffet_inter_title' },
        { key: 'food_cocktail', price: 1300, titleKey: 'food_cocktail_title' },
        { key: 'food_chinese_sup', price: 1550, titleKey: 'food_chinese_sup_title' },
        { key: 'food_chinese_deluxe', price: 2000, titleKey: 'food_chinese_deluxe_title' },
        { key: 'food_individual', price: 2200, titleKey: 'food_individual_title' },
    ],
    beverages: [
        { key: 'liquor_singha', price: 6500, titleKey: 'liquor_singha_title', subtitleKey: 'liquor_singha_subtitle', unitKey: 'unit_barrel' },
        { key: 'liquor_asahi', price: 7000, titleKey: 'liquor_asahi_title', subtitleKey: 'liquor_asahi_subtitle', unitKey: 'unit_barrel' },
    ]
};

const StepFood = ({ zone, foodAndBev, setFoodAndBev, T }) => {
    
    const handleLunchDinnerSelect = (key) => {
        setFoodAndBev(prev => ({ ...prev, lunchDinner: prev.lunchDinner === key ? null : key }));
    };

    const handleBeverageChange = (key, value) => {
        const quantity = parseInt(value) || 0;
        setFoodAndBev(prev => ({
            ...prev,
            beverages: { ...prev.beverages, [key]: quantity }
        }));
    };
    
    if (zone === 'small') {
        return (
            <div className="step active space-y-8">
                <h2 className="text-xl font-semibold mb-4">{T.section_food_bev_title} (*{T.zone_small_title})</h2>
                 <div className="space-y-4">
                     {foodOptionsSmall.lunchDinner.map(item => (
                         <div key={item.key} onClick={() => handleLunchDinnerSelect(item.key)} className={`option-card p-5 rounded-xl ${foodAndBev.lunchDinner === item.key ? 'selected' : ''}`}>
                             <h3 className="font-semibold">{T[item.titleKey]}</h3>
                             <p className="text-sm text-gray-500">{T[item.subtitleKey]}</p>
                             <p className="font-bold mt-2 text-[#a2674b]">฿{formatCurrency(item.price)}</p>
                             <p className="text-xs text-gray-500 mt-1">{T[item.noteKey]}</p>
                         </div>
                     ))}
                 </div>
            </div>
        )
    }

    return (
        <div className="step active space-y-8">
             <h2 className="text-xl font-semibold mb-4">{T.section_food_bev_title} (*{T.zone_medium_title} & {T.zone_large_title})</h2>
             {/* Breaks */}
             <div className="space-y-3">
                 <h3 className="text-lg font-semibold border-b pb-2 mb-3">{T.break_title}</h3>
                 {foodOptionsMedLarge.breaks.map(item => (
                     <div key={item.key} className={`option-card p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer ${foodAndBev.breaks === item.key ? 'selected' : ''}`}>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="break_option" checked={foodAndBev.breaks === item.key} onChange={() => setFoodAndBev(p => ({...p, breaks: item.key}))} className="custom-radio h-5 w-5 rounded-full text-[#a2674b] focus:ring-[#a2674b]" />
                            <span className="ml-4 flex-grow"><span>{T[item.titleKey]}</span></span>
                            <span className="font-medium">฿{formatCurrency(item.price)}</span>
                        </label>
                     </div>
                 ))}
             </div>
             {/* Lunch/Dinner */}
             <div className="space-y-3 mt-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">{T.lunch_dinner_title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {foodOptionsMedLarge.lunchDinner.map(item => (
                        <div key={item.key} onClick={() => handleLunchDinnerSelect(item.key)} className={`option-card p-5 rounded-xl ${foodAndBev.lunchDinner === item.key ? 'selected' : ''}`}>
                            <h3 className="font-semibold">{T[item.titleKey]}</h3>
                            <p className="font-bold mt-2 text-[#a2674b]">฿{formatCurrency(item.price)} / <span>{T.per_person}</span></p>
                        </div>
                    ))}
                </div>
             </div>
             {/* Beverages */}
             <div className="space-y-3 mt-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">{T.liquor_title}</h3>
                {foodOptionsMedLarge.beverages.map(item => (
                    <div key={item.key} className="addon-item-quantity">
                        <label className="flex-grow">
                            <span>{T[item.titleKey]}</span>
                            <p className="text-xs text-gray-500">{T[item.subtitleKey]}</p>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">฿{formatCurrency(item.price)}</span>
                            <input type="number" value={foodAndBev.beverages[item.key] || ''} onChange={(e) => handleBeverageChange(item.key, e.target.value)} min="0" className="w-20 p-2 text-center border border-gray-300 rounded-lg" placeholder="0" />
                        </div>
                    </div>
                ))}
             </div>
        </div>
    );
};


// Data for Studio
const studioPackages = [
    { key: 'personal_shooting', price: 15000, titleKey: 'personal_shooting_title', subtitleKey: 'personal_shooting_subtitle', details: { time: '8:00 - 17:00 (Mon-Fri Only)', zoneKey: 'all_area_except_bar', conditionsKey: 'personal_conditions', securityKey: 'personal_security_fee' } },
    { key: 'commercial_shooting', price: 50000, titleKey: 'commercial_shooting_title', subtitleKey: 'commercial_shooting_subtitle', details: { time: '6:00 - 18:00 (Mon-Fri Only)', zoneKey: 'all_area_except_bar', securityKey: 'commercial_security_fee' } },
];

const StepShootingType = ({ onSelect, selected, expanded, setExpanded, extraHours, setExtraHours, T }) => (
    <div className="step active space-y-8">
        <h2 className="text-xl font-semibold mb-4">{T.section_studio_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studioPackages.map(pkg => (
                <div key={pkg.key} className={`option-card rounded-xl overflow-hidden ${selected === pkg.key ? 'selected' : ''}`}>
                    <div onClick={() => onSelect(pkg.key)} className="p-5 cursor-pointer">
                        <h3 className="font-semibold">{T[pkg.titleKey]}</h3>
                        <p className="text-sm text-gray-500">{T[pkg.subtitleKey]}</p>
                        <p className="font-bold mt-2 text-[#a2674b]">฿{formatCurrency(pkg.price)}</p>
                    </div>
                     <div className="details-container" style={{ maxHeight: expanded === pkg.key ? '500px' : '0' }}>
                        <div className="p-5 border-t bg-gray-50/50 space-y-2 text-sm text-gray-600">
                            <p><strong>{T.time_label}:</strong> {pkg.details.time}</p>
                            <p><strong>{T.zone_label}</strong> <span>{T[pkg.details.zoneKey]}</span></p>
                            {pkg.details.conditionsKey && <p><strong>{T.conditions_label}</strong> <span>{T[pkg.details.conditionsKey]}</span></p>}
                            <p><strong>{T.security_fee_label}</strong> <span>{T[pkg.details.securityKey]}</span></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {selected === 'commercial_shooting' && (
            <div className="pt-4">
                <label htmlFor="extra-hours" className="block font-medium mb-2">{T.extra_hours_label}</label>
                <input type="number" id="extra-hours" min="0" value={extraHours} onChange={(e) => setExtraHours(parseInt(e.target.value) || 0)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a2674b] focus:border-transparent transition" />
            </div>
        )}
        <div>
            <h2 className="text-xl font-semibold mb-4">{T.facility_title}</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>{T.facility_1}</li><li>{T.facility_2}</li><li>{T.facility_3}</li><li>{T.facility_4}</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">{T.vat_notice}</p>
            <p className="text-sm text-gray-500 mt-1">{T.setup_time_notice}</p>
        </div>
    </div>
);


const ThankYouScreen = ({ T, calculation, onGetQuote, onGoBack, onStartOver, onSaveImage, isSavingImage, isSubmitted }) => {
    return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="elegant-card text-center p-8">
            <h2 className="text-3xl font-bold mb-2">{isSubmitted ? T.thanks_title : T.final_summary_title}</h2>
            <p className="text-gray-600 mb-6">{isSubmitted ? T.thanks_subtitle : T.final_summary_subtitle}</p>
            
            <div className="p-6 my-6 bg-white border border-gray-200 rounded-xl text-left">
               <SummaryContent T={T} calculation={calculation} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-4">
                <button onClick={onGetQuote} disabled={isSubmitted} className="w-full btn-final-primary font-semibold py-4 rounded-lg text-lg">
                    {isSubmitted ? T.submitted_btn : T.get_quote_btn}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onClick={onGoBack} className="w-full btn-final-secondary font-semibold py-3 px-6 rounded-lg">{T.go_back_btn}</button>
                    <button onClick={onStartOver} className="w-full btn-final-secondary font-semibold py-3 px-6 rounded-lg">{T.start_over_btn}</button>
                    <button onClick={onSaveImage} disabled={isSavingImage} className="w-full btn-final-secondary font-semibold py-3 px-6 rounded-lg">
                        {isSavingImage ? <div className="spinner mx-auto"></div> : T.save_image_btn}
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
};


const ContactModal = ({ T, isOpen, onClose, onSubmit, formData, handleFormChange, isSubmitting, showAddons }) => {
    if (!isOpen) return null;
    return (
         <div className="modal active fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
            <div className="modal-content elegant-card w-full max-w-sm p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <h2 className="text-2xl font-bold mb-2">{T.modal_title}</h2>
                <p className="text-gray-500 mb-6">{T.modal_subtitle}</p>
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                           <label htmlFor="email" className="block font-medium mb-2">{T.email_label}</label>
                           <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder={T.email_placeholder} required />
                        </div>
                        <div>
                           <label htmlFor="phone" className="block font-medium mb-2">{T.phone_label}</label>
                            <div className="flex">
                                <select name="countryCode" value={formData.countryCode} onChange={handleFormChange} className="p-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 appearance-none text-center">
                                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                </select>
                               <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-r-lg" placeholder={T.phone_placeholder} required />
                           </div>
                        </div>
                         <div>
                           <label htmlFor="line_id" className="block font-medium mb-2">{T.line_label}</label>
                           <input type="text" id="line_id" name="lineId" value={formData.lineId} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder={T.line_placeholder} />
                        </div>
                        <div>
                           <label htmlFor="event_date" className="block font-medium mb-2">{T.event_date_label}</label>
                           <input type="date" id="event_date" name="eventDate" value={formData.eventDate} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        {showAddons && (
                             <div>
                                <label className="block font-medium mb-2">{T.addon_dropdown_label}</label>
                                <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                                    {addonData.map(addon => (
                                        <label key={addon.key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                                            <input type="checkbox" name="addons" value={T[addon.key]} checked={formData.addons.includes(T[addon.key])} onChange={handleFormChange} className="custom-checkbox h-4 w-4 rounded text-[#a2674b]" />
                                            <span>{T[addon.key]}</span>
                                        </label>
                                    ))}
                                </div>
                             </div>
                        )}
                        <div>
                           <label htmlFor="special_request" className="block font-medium mb-2">{T.special_request_label}</label>
                           <textarea id="special_request" name="specialRequest" value={formData.specialRequest} onChange={handleFormChange} rows="3" className="w-full p-3 border border-gray-300 rounded-lg" placeholder={T.special_request_placeholder}></textarea>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary font-semibold py-3 rounded-lg mt-8 text-lg">
                        {isSubmitting ? <div className="spinner mx-auto"></div> : T.submit_btn}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- CSS Styles ---
const CustomStyles = () => (
    <style>{`
        body { font-family: 'Kanit', sans-serif; background-color: #b2c4d0; color: #4A4A4A; }
        html[lang="en"] body { font-family: 'Montserrat', sans-serif; }
        .elegant-card { background-color: white; border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04); position: relative; }
        .btn-primary { background-color: #a2674b; color: white; transition: background-color 0.3s, opacity 0.3s; white-space: nowrap; }
        .btn-primary:hover:not(:disabled) { background-color: #8a563c; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-secondary { background-color: #F9F6F3; color: #4A4A4A; border: 1px solid #EFEAE6; transition: background-color 0.3s; white-space: nowrap; }
        .btn-secondary:hover { background-color: #EFEAE6; }
        .btn-final-primary { background-color: #a2674b; color: white; border: none; transition: background-color 0.3s; white-space: nowrap; }
        .btn-final-primary:hover:not(:disabled) { background-color: #8d715a; }
        .btn-final-secondary { background-color: #c7c1bf; color: white; border: none; transition: background-color 0.3s; white-space: nowrap; }
        .btn-final-secondary:hover:not(:disabled) { background-color: #b3acaa; }
        .option-card { border: 2px solid #EAEAEA; transition: all 0.3s ease; cursor: pointer; }
        .option-card.selected { border-color: #a2674b; box-shadow: 0 0 15px rgba(162, 103, 75, 0.3); transform: translateY(-5px); }
        .time-option.selected { background-color: #a2674b; color: white; border-color: #a2674b; font-weight: 500; }
        .summary-panel { background-color: #F9F6F3; border-left: 1px solid #EFEAE6; }
        .step { position: absolute; top: 0; left: 0; width: 100%; transition: opacity 0.4s ease-in-out; opacity: 0; visibility: hidden; }
        .step.active { position: relative; opacity: 1; visibility: visible; }
        .progress-bar-container { background-color: #EFEAE6; border-radius: 999px; height: 8px; overflow: hidden; }
        .progress-bar-fill { background-color: #a2674b; border-radius: 999px; transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .lang-switcher { border: 2px solid #EAEAEA; border-radius: 0.5rem; width: 44px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
        .lang-switcher.active { background-color: #a2674b; color: white; border-color: #a2674b; }
        .custom-checkbox:checked, .custom-radio:checked { background-color: #a2674b; border-color: #a2674b; }
        .modal-backdrop { background-color: rgba(0,0,0,0.6); }
        .modal-content { transform: translateY(20px); opacity: 0; transition: transform 0.3s ease-out, opacity 0.3s ease-out; max-height: 90vh; overflow-y: auto; }
        .modal.active .modal-content { transform: translateY(0); opacity: 1; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; appearance: textfield; }
        .addon-item-quantity { display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid #E5E7EB; border-radius: 0.5rem; background-color: #FFFFFF; }
        .details-container { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-in-out; }
        .spinner { border: 3px solid rgba(162, 103, 75, 0.2); border-top-color: #a2674b; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
);


// Final helper function for image generation (needs to be outside component to be callable)
const generateA4QuoteHtml = (T, totalCalculation, formData, packageType, guests, venueKey, zone, studioChoice, studioExtraHours, packageChoice, foodAndBev) => {
    
    let lineItemsHtml = '';
    let itemCounter = 1;

    const addLineItem = (description, qty, unitPrice) => {
        const total = qty * unitPrice;
        lineItemsHtml += `<div class="flex items-start py-3 border-b border-gray-200 text-sm"><div style="width: 8.33%;" class="text-center px-1">${String(itemCounter++).padStart(3, '0')}</div><div style="width: 41.66%;" class="px-1">${description}</div><div style="width: 16.66%;" class="text-center px-1">${qty}</div><div style="width: 16.66%;" class="text-right px-1">${formatCurrency(unitPrice)}</div><div style="width: 16.66%;" class="text-right px-1 font-semibold">${formatCurrency(total)}</div></div>`;
    };

    if (packageType === 'studio') {
        const pkg = studioPackages.find(p => p.key === studioChoice);
        if (pkg) addLineItem(`${T.summary_studio_rental} (${T[pkg.titleKey]})`, 1, pkg.price);
        if (studioExtraHours > 0) addLineItem(T.summary_studio_extra_hours, studioExtraHours, 5000);
    } else {
        if (packageType === 'wedding') {
             const pkg = weddingPackages.find(p => p.key === packageChoice);
             if (pkg) addLineItem(T[pkg.titleKey], 1, pkg.price);
             if (venueKey === 'venue_full_day') addLineItem(T.summary_full_day_surcharge, 1, 100000);
        } else if (packageType === 'event') {
             const zoneData = zones.find(z => z.zone === zone);
             const price = zoneData ? parseInt(zoneData[`price${venueKey.split('_')[1].charAt(0).toUpperCase() + venueKey.split('_')[1].slice(1)}`]) || zoneData.priceAllday : 0;
             if (price > 0) addLineItem(`${T.summary_venue_rental} (${T['zone_'+zone+'_title']} Zone, ${T[venueKey]})`, 1, price);
        }

        // Food & Bev for both Wedding and Event
        if (zone === 'small') {
             const item = foodOptionsSmall.lunchDinner.find(ld => ld.key === foodAndBev.lunchDinner);
             if (item) {
                let itemTotal = item.price;
                if (guests > item.basePax) itemTotal += (guests - item.basePax) * item.extraPrice;
                addLineItem(`${T[item.titleKey]} (สำหรับ ${guests} ท่าน)`, 1, itemTotal);
             }
        } else {
            const breakItem = foodOptionsMedLarge.breaks.find(b => b.key === foodAndBev.breaks);
            if (breakItem) addLineItem(T[breakItem.titleKey], 1, breakItem.price);
            
            const lunchItem = foodOptionsMedLarge.lunchDinner.find(ld => ld.key === foodAndBev.lunchDinner);
            if (lunchItem) addLineItem(T[lunchItem.titleKey], guests, lunchItem.price);

            Object.entries(foodAndBev.beverages).forEach(([key, qty]) => {
                if (qty > 0) {
                    const bevItem = foodOptionsMedLarge.beverages.find(b => b.key === key);
                    if (bevItem) addLineItem(T[bevItem.titleKey], qty, bevItem.price);
                }
            });
        }
    }
    
    // ... [The rest of the A4 HTML structure, similar to the original JS]
    const now = new Date();
    const quoteNumber = `VARAVELA-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const quoteDate = now.toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' });

    return `
    <div class="font-kanit text-black bg-white p-8" style="width: 780px; height: 1103px; color: #333; font-size: 10pt; display: flex; flex-direction: column;">
        <header class="flex justify-between items-start pb-4 border-b-2 border-gray-300">
            <div class="w-2/5">
                <div class="bg-[#a2674b] text-white p-3 text-center rounded-t-lg"><h1 class="font-bold text-lg">ใบประเมินราคาเบื้องต้น</h1><p class="text-sm">Estimated Cost Summary</p></div>
                <div class="text-xs mt-4 space-y-1 p-2"><p><strong>Tel:</strong> ${formData.phone ? `${formData.countryCode} ${formData.phone}` : '(ยังไม่ระบุ)'}</p><p><strong>Email:</strong> ${formData.email || '(ยังไม่ระบุ)'}</p><p><strong>Line ID:</strong> ${formData.lineId || '(ยังไม่ระบุ)'}</p></div>
            </div>
            <div class="w-2/5 text-right"><img src="https://i.postimg.cc/br5jzbTF/Asset-8-4x-8-0.png" alt="Varavela Logo" class="w-48 ml-auto" crossorigin="anonymous"><div class="mt-4 text-xs space-y-1"><p><strong>เลขที่:</strong> ${quoteNumber}</p><p><strong>วันที่:</strong> ${quoteDate}</p><p><strong>อ้างอิง:</strong> ${formData.email || ''}</p></div></div>
        </header>
        <section class="my-4 text-xs flex justify-between gap-4 pb-4 border-b-2 border-dotted border-gray-300">
            <div class="w-1/2"><p class="font-bold">ผู้ติดต่อ:</p><p>วาระเวลา คอร์เปอเรชั่น จำกัด</p><p>เลขที่ 438 ซอย นวมินทร์ 111 แยก 15</p><p>แขวงนวมินทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10240</p></div>
            <div class="w-1/2 text-right"><p class="font-bold">เลขประจำตัว:</p><p>0105558016701</p><p class="font-bold mt-2">ติดต่อ:</p><p>029466626</p><p>hello@varavela.com</p></div>
        </section>
        <section class="flex-grow">
            <div class="bg-gray-100 font-bold flex p-2 rounded-t-md text-xs"><div style="width: 8.33%;" class="text-center px-1">รหัส</div><div style="width: 41.66%;" class="px-1">รายละเอียด</div><div style="width: 16.66%;" class="text-center px-1">จำนวน</div><div style="width: 16.66%;" class="text-right px-1">ราคา/หน่วย</div><div style="width: 16.66%;" class="text-right px-1">รวมเป็นเงิน</div></div>
            <div class="border border-t-0 border-gray-200 rounded-b-md">${lineItemsHtml}</div>
        </section>
        <footer class="mt-auto pt-4">
            <div class="flex justify-between gap-8">
                <div class="w-1/2 text-xs"><div class="flex justify-between"><p class="font-bold">หมายเหตุ:</p><p class="text-right">*ยังไม่รวม Vat 7%</p></div></div>
                <div class="w-1/2 text-sm">
                    <div class="flex justify-between items-center bg-gray-200 p-2 rounded-md mt-1"><span class="font-bold text-base">ราคารวมสุทธิ</span><span class="font-bold text-base">฿${formatCurrency(totalCalculation.total)}</span></div>
                </div>
            </div>
            <div class="mt-4 text-xs border-t pt-2 flex justify-between gap-8">
                <div class="w-1/2"><h4 class="font-bold mb-1">เงื่อนไขการจองและการชำระเงิน</h4><ul class="list-disc list-inside space-y-1"><li>งวดที่ 1 หนึ่งแสนบาทถ้วน </li><li>งวดที่ 2 ครึ่งนึงจากยอดที่เหลือ 30 วันก่อนวันงาน</li><li>งวดที่ 3 จำนวนที่เหลือ ณ วันงาน</li></ul></div>
                <div class="w-1/2"><h4 class="font-bold mb-1">ข้อมูลการชำระเงิน</h4><p>ชื่อบัญชี: วาระเวลา</p><p>ธนาคาร: ออมสิน เลขที่บัญชี 0123456789</p><p>รับบัตรเครดิตทุกธนาคาร</p></div>
            </div>
        </footer>
    </div>`;
};


