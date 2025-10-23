"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { selectBusiness } from "@/store/slices/selectedBusinessSlice";

export default function BusinessProfilePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  // Get business from Redux (assuming you have businesses in businessSlice)
  const businesses = useSelector((state: any) => state.business.businesses);
  const selectedBusiness = useSelector(
    (state: any) => state.selectedBusiness.currentBusiness
  );
  const connections = useSelector((state: any) => state.connection.connections);

  useEffect(() => {
    // Find business by ID and set it in Redux
    const business = businesses.find((b: any) => b.id === params.id);
    if (business) {
      dispatch(selectBusiness(business));
    }
  }, [params.id, businesses, dispatch]);

  // Check if already connected
  const existingConnection = connections.find(
    (conn: any) => conn.businessId === params.id
  );

  if (!selectedBusiness) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading business profile...</p>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    setShowConnectionModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                      {selectedBusiness.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {selectedBusiness.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {selectedBusiness.category || selectedBusiness.serviceType}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {selectedBusiness.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-gray-600">
                      {selectedBusiness.description ||
                        "A trusted business partner specializing in quality products and reliable service."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.services?.map((service: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {service}
                        </Badge>
                      )) || <Badge variant="outline">General Trade</Badge>}
                    </div>
                  </div>

                  {selectedBusiness.specialties && (
                    <div>
                      <h3 className="font-semibold mb-2">Specialties</h3>
                      <p className="text-gray-600">{selectedBusiness.specialties}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Business Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedBusiness.yearsInBusiness || "5+"}
                    </p>
                    <p className="text-sm text-gray-600">Years in Business</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedBusiness.rating || "4.8"}
                    </p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedBusiness.totalPartners || "150+"}
                    </p>
                    <p className="text-sm text-gray-600">Partners</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact & Action */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{selectedBusiness.email || "contact@business.com"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{selectedBusiness.phone || "+234 XXX XXX XXXX"}</span>
                </div>
                {selectedBusiness.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connection Status / Action */}
            <Card>
              <CardHeader>
                <CardTitle>Connection</CardTitle>
              </CardHeader>
              <CardContent>
                {existingConnection ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {existingConnection.status === "pending" && (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="font-medium text-sm">Request Pending</p>
                            <p className="text-xs text-gray-600">Waiting for response</p>
                          </div>
                        </>
                      )}
                      {existingConnection.status === "accepted" && (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Connected</p>
                            <p className="text-xs text-gray-600">You can now collaborate</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/connections")}
                    >
                      View Connection Details
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Connect with this business to start collaborating and making
                      transactions.
                    </p>
                    <Button className="w-full" size="lg" onClick={handleConnect}>
                      <Building2 className="w-4 h-4 mr-2" />
                      Send Connection Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Connection Request Modal</h2>
            <p className="text-gray-600 mb-4">We'll build this component next!</p>
            <Button onClick={() => setShowConnectionModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
