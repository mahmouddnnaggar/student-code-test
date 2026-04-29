import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "../types/brands.types";

interface BrandsState {
  allBrands: Brand[];
  selectedBrand: Brand | null; // لو حبيت تعرض تفاصيل براند معين في Modal
}

const initialState: BrandsState = {
  allBrands: [],
  selectedBrand: null,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    // الأكشن اللي هيحط كل البراندات في الستور
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.allBrands = action.payload;
    },
    // لو حبيت تخزن براند واحد لما تضغط عليه
    setSelectedBrand: (state, action: PayloadAction<Brand | null>) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const { setBrands, setSelectedBrand } = brandsSlice.actions;
export default brandsSlice.reducer;