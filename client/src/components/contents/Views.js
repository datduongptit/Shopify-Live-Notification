import React, { useState, useCallback } from "react";
import { Tabs, Card } from "@shopify/polaris";
import NotificationSettings from "./NotificationSettings";
import ManualSale from "./ManualSale";
import RealtimeSettings from "./RealtimeSettings";
import Support from "../Support";
import Note from "../Note";
import Navbar from "../header/Navbar";
import ProductTable from "../ManualSale/ProductTable";
const Views = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers",
      content: "Notification Settings",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content",
      component: <NotificationSettings />,
    },
    {
      id: "accepts-marketing",
      content: "Manual Sale",
      panelID: "accepts-marketing-content",
      component: <ManualSale />,
    },
    {
      id: "repeat-customers",
      content: "Realtime Watching Settings",
      panelID: "repeat-customers-content",
      component: <RealtimeSettings />,
    },
    // {
    //   id: "check-charge",
    //   content: "Check Charge",
    //   panelID: "Check Charge1",
    //   component: <ProductTable />,
    // },
  ];
  return (
    <div className="mt-3">
      <Navbar />
      <div className="container-all">
        <Card sectioned>
          <Note />
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <Card.Section>
              <div>{tabs[selected].component}</div>
            </Card.Section>
          </Tabs>
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "15px",
              zIndex: 1000,
            }}
          >
            <Support />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Views;
